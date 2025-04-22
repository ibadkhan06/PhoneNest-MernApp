const product = require('../models/products');
const mongoose=require("mongoose")
const {handleErrors,priceError} =require("../utils/handleerror")

const createProduct = async (req, res) => {
  console.log('Request Payload:', req.fields);
  console.log('file Payload:', req.file);

  try {
    const { name, price, category, quantity, brand, image } = req.fields;

    if (!name || !price || !category || !quantity || !brand || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newProduct = await product.create({
      name,
      price,
      category,
      quantity,
      brand,
      image
    });

    res.status(201).json({ newProduct });
  } catch (error) {
    const err = handleErrors(error);
    res.status(500).json({ error: err });
  }
};
 

const getAllProducts = async(req,res)=>{          //populate is used to show data from other collections
    try{
      // .populate("reviews.user","email")
        const products=await product.find({}).populate("category","name").limit(12).sort({createdAt:-1})
        //console.log(products)
        res.status(200).json({products})
    }
    catch(error){    
        console.error(error);                  
        res.status(500).json({error})         
    }
}
const findprodbyid = async(req,res)=>{
  // .populate("reviews.user","email")
    try{
    const newproduct=await product.findById(req.params.id).populate("category","name")      
    res.status(200).json(newproduct)
    }
    catch(error){                 
        console.error(error);                      
        res.status(500).json({error})         
    }
    }  
const top_rated =async(req,res)=>{
try{
const products = await product.find({}).sort({rating:-1}).limit(6)
res.status(200).json(products)
}
catch(error){                 
  console.error(error);                      
  res.status(500).json({error})         
}
}
const cheapest =async(req,res)=>{
  try{
  const products = await product.find({}).sort({price:1}).limit(6)
  res.status(200).json(products)
  }
  catch(error){                 
    console.error(error);                      
    res.status(500).json({error})         
  }
  }


    const addreview = async(req,res)=>{
        try{
        // const user_id=req.user._id
        const s_prod =await product.findById(req.params.id)
        console.log(req.params.id)
        if(!s_prod){
            return res.status(404).json({error:"product do not found"})
        }
        // const alreadyreviewed =s_prod.reviews.find((review)=>review.user._id.toString()===user_id.toString())
        // if(alreadyreviewed){
        //     return res.status(400).send("already reviewed")
        // }
        const newReview = {
            content: req.body.content,
            rating: req.body.rating,
            // user: user_id 
        };
        console.log(req.body)
console.log(newReview)
        s_prod.reviews.push(newReview);
        const total=s_prod.reviews.length
        s_prod.totalratings=total
        const sumvar=s_prod.reviews.reduce((total,review)=>review.rating +total,0)  // this structure is defined for reduce
        s_prod.rating=sumvar/total
        await s_prod.save()
        // const populatedProduct = await s_prod.populate("reviews.user","email");
        res.status(201).json(s_prod);
       
    }
    catch(error){
      console.error('Adding Review Failed:', error.message || error);
      res.status(500).json({ error: "Internal Server Error", details: error.message })
    }}
    
    const filterproducts = async (req, res) => {
        try {
          const filters = {}; // Object creation as category, brand, price will be part of it
    
          if (req.query.category) {
             // Convert category from string to ObjectId type
              filters.category = new mongoose.Types.ObjectId(req.query.category);
          }
          if (req.query.brand) {
            filters.brand = req.query.brand;
          }
          if (req.query.minprice && req.query.maxprice) {
            const minPrice = parseInt(req.query.minprice);
            const maxPrice = parseInt(req.query.maxprice);

            const result =priceError(minPrice)
            const result2 =priceError(maxPrice)

            if (result && result2) {
              filters.price = { $gte: minPrice, $lte: maxPrice };
            } else {
              return res.status(400).json({ error: "enter valid number" });
            }
          } 
            else if (req.query.minprice) {
            const minPrice = parseInt(req.query.minprice);
             
            const result =priceError(minPrice)
            if (result) {
              filters.price = { $gte: minPrice };
            } else {
              return res.status(400).json({ error: "Minprice must be a valid number" });
            }
          }
          
          else if (req.query.maxprice) {
            const maxPrice = parseInt(req.query.maxprice);
        
            const result =priceError(maxPrice)

            if (result) {
              filters.price = { $lte: maxPrice };
            } else {
              return res.status(400).json({ error: "Maxprice must be a valid number"  });
            }
          }
          const filtered = await product.find(filters);
          res.status(200).json( filtered );
        } catch (error) {
            console.error(error)
          res.status(500).json({ error: "Internal Server Error" });
        }
      };
      
 //here we have to find product that matches name with req.query and display data according to pages 

 const fetchproductbyname = async (req, res) => {
    try {
        const pagesize=1
        const page =parseInt(req.query.page)  || 1
        let criteria={}

if(req.query.temp){
const searchItem= req.query.temp
criteria = {
  $or: [
    { name: { $regex: searchItem, $options: "i" } },
    { brand: { $regex: searchItem, $options: "i" } },
      // { category: { $regex: new RegExp(searchItem, "i") } }
  ]
};
}
        const noofproducts= await product.countDocuments(criteria)
        const products = await product.find(criteria).skip((page-1)*pagesize).limit(pagesize)
        res.status(200).json({page, products, totalpages:Math.ceil(noofproducts/pagesize), hasmorepages: page*pagesize< noofproducts})
    }
    catch(error){
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" });
    }
 }


module.exports={createProduct,getAllProducts,findprodbyid,addreview,filterproducts,fetchproductbyname,top_rated,cheapest}
