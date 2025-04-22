const notfound=(req,res)=>{
    res.status(404).send("resource not found")
}
module.exports=notfound