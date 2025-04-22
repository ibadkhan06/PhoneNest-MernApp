const mongoose = require(`mongoose`);

const categorySchema=mongoose.Schema({
  
    name:{
        type:String,
        required:[true,"must enter name"],
        trim:true,
        unique:true
    }
})

const category = mongoose.model(`category`,categorySchema);
module.exports = category;