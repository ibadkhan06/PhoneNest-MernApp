const express = require("express")
const router = express.Router()

const{createorder,seemyorder,totalsale,markOrderAsPaid,markOrderAsDelivered}=require("../controllers/orders")
const {authenticate, authorizeAdmin} = require("../middleware/users");


router.get("/sales",totalsale)
router.post("/",createorder)
router.get("/",authenticate,seemyorder)
router.get("/:id",authenticate,markOrderAsPaid)
router.get("/delivery/:id",authenticate,markOrderAsDelivered)
module.exports=router