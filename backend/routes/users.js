const express = require("express")
const router = express.Router()

const{login,register,logout,getallusers,getuserbyid,currentuser,updatecurrentuser}=require("../controllers/users")
const {authenticate, authorizeAdmin} = require("../middleware/users");

router.post(`/login`,login);
router.post(`/register`,register);
router.get('/logout',logout);

router.get(`/profile`,authenticate,currentuser);
router.patch(`/profile`,authenticate,updatecurrentuser);

router.get(`/`,authenticate,authorizeAdmin,getallusers);
router.get(`/:id`,authenticate,authorizeAdmin,getuserbyid);


module.exports=router