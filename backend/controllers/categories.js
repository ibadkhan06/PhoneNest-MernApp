const category = require('../models/categories');
const handleErrors=require("../utils/handleerror")


const getAllCat = async(req,res)=>{
try{
const allcategory=await category.find()          //promise return rejection or acceptance,in case of acceptance it will run here
res.status(200).json(allcategory)
}
catch(error){                                 
    res.status(500).json({msg:error})         //validation errors and custom errors
}
}

const getCat = async(req,res)=>{
    try{
    const getcategory=await category.findById(req.params.id)          
    res.status(200).json({getcategory})
    if (category.length==0){
        res.status(404).send("resource not found")
    }
    }
    catch(error){                                 
        res.status(500).json({msg:error})         
    }
    }
 const createCat = async(req,res)=>{
    try{
    const newcategory=await category.create(req.body)          
    res.status(201).json({newcategory})
    }
    catch(error){  
        const err= handleErrors(error)                               
        res.status(500).json({msg:err})         
    }
    }    
 const deleteCat = async(req,res)=>{
    try{
    const delcategory=await category.findByIdAndDelete(req.params.id)        
    res.status(200).send("category tour has been deleted")
    if (delcategory.length==0){
        res.status(404).send("resource not found")
    }
    }
    catch(error){                                 
        res.status(500).json({msg:error})         
    }
    }   

 const updateCat = async(req,res)=>{
        try{
        const updatedCat=await category.findByIdAndUpdate(req.params.id,req.body,{new:true})        
        res.status(201).json({updatedCat})
        if (updatedCat.length==0){
            res.status(404).send("resource not found")
        }
        }
        catch(error){                                 
            res.status(500).json({msg:error})         
        }
        }      

module.exports={
    getAllCat,getCat,updateCat,deleteCat,createCat
};        