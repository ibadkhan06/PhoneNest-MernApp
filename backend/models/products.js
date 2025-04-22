const mongoose = require(`mongoose`);
const {ObjectId}=mongoose.Schema

const reviewSchema = mongoose.Schema({
content:{
    type:String,
    required:true
},
rating:{
    type: Number,
    required: true,
    default: 0
},
// user:{
//     type:ObjectId,
//     ref:"user",
//     required: true,
// }
})

const productSchema = mongoose.Schema({
    image: { type: String, required: true },
    name:{
    type:String,
    required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    rating: { 
        type: Number,
        default: 0 },
    
        totalratings:{            //total no ratings for finding avg
        type: Number,
        default: 0 
    } ,  

    category:{
        type:ObjectId,
        ref:"category",
        required:true
    },
    reviews:[reviewSchema]
},
{timestamps:true}
);
const product = mongoose.model(`product`,productSchema);
module.exports = product;