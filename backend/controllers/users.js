const User = require(`../models/users`)
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {handleErrors}=require("../utils/handleerror")

const maxage = 3*24*60*60
const createtoken =(id)=>{                 //creating token for specific user using his id
return jwt.sign({id},'ibad ninja secret',{expiresIn:maxage});
}

module.exports.register =async (req,res)=>{
    const {email,password,phone,city} = req.body;
    console.log(req.body)
    try{
    const salt = await bcrypt.genSalt()
    const hashedpassword = await bcrypt.hash(password,salt)
    const user = await User.create({email,password:hashedpassword,phone,city});
    const token = createtoken(user._id);
    res.cookie('jwt',token,{maxage:maxage*1000});          //after creating token,it is stored in cookies and send back to user
    res.status(201).json({user});            
    }
    catch(err){
      console.error('Error:', err);
        const errors = handleErrors(err);
        res.status(400).json(errors);
    }
}

module.exports.login =async (req,res)=>{
  try{
  const {email,password} = req.body;
  const user = await User.findOne({email});
  if(user){
      const auth=await bcrypt.compare(password,user.password);
      if(auth){
        const token = createtoken(user._id);
        res.cookie('jwt',token,{maxage:maxage*1000});   //using httpOnly:true cookie is not accessible via js (inspect element) for securing cookie
        res.status(200).json({user})
        console.log(user)
      }
      else{
      res.status(400).send("password incorrect")
      console.log(res)
      }
  
  }
  else{
  res.status(400).send("email not regsitered")}
}
 catch(err){
     res.status(500).json(err)
 } 
}

module.exports.logout= (req,res) => {
res.cookie('jwt', '',{maxage:0});            //201 status for success creation and 200 for suceess activity
res.status(200).send("loged out sucessessfully")
}

module.exports.getallusers= async(req,res) => {
  try{
  const users= await User.find({})
  res.status(200).json(users)
  }
catch(error){
  res.status(500).json(error)
}
}

module.exports.currentuser= async(req,res) => {    //cuurent user
  try{
    const id=req.user._id
    const user= await User.findById(id)        //accessing current user id(authenticated) passing control from next() auth middlware
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({user})
    }
  catch(error){
    res.status(500).json({error})
  }
  }

module.exports.updatecurrentuser= async(req,res) => {     //cuurent user
    try{
      const updateduser= await User.findByIdAndUpdate(req.user._id,req.body,{new:true})
      if(!updateduser){
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({updateduser})
    }
    catch(error){
      res.status(500).json({error})
    }
  }
  module.exports.getuserbyid= async(req,res) => {
    try{
      const user= await User.findById(req.params.id).select("-password") //find user but not his password     
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({user})
      }
    catch(error){
      res.status(500).json({error})
    }
    }


//we use req.fields only when we send file data too in forms