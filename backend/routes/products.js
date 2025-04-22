const express = require("express")
const formidable = require('express-formidable');
const router = express.Router()

const{createProduct,getAllProducts,findprodbyid,addreview,filterproducts,fetchproductbyname,top_rated,cheapest}=require("../controllers/products")
const {authenticate, authorizeAdmin} = require("../middleware/users");

router.post(`/`,formidable(),createProduct);
router.get(`/`,getAllProducts);
router.get(`/filter`,filterproducts);
router.get(`/fetch`,fetchproductbyname);
router.get(`/top`,top_rated);
router.get(`/cheapest`,cheapest);
router.get(`/:id`,findprodbyid);
router.post(`/:id`,addreview);
// router.post(`/:productid`,authenticate,addreview);
// router.post(`/`,authenticate,authorizeAdmin,createProduct);


module.exports=router