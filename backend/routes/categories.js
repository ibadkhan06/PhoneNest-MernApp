const express = require("express")
const router = express.Router()

const{ getAllCat,getCat,updateCat,deleteCat,createCat}=require("../controllers/categories")
const {authenticate, authorizeAdmin} = require("../middleware/users");


router.get(`/`,getAllCat);
router.get(`/:id`,getCat);
router.post(`/`,authenticate,authorizeAdmin,createCat);
router.patch(`/:id`,authenticate,authorizeAdmin,updateCat);
router.delete(`/:id`,authenticate,authorizeAdmin,deleteCat);

module.exports=router