const mongoose = require(`mongoose`);
const product = require("./products");
const {ObjectId}=mongoose.Schema


const orderSchema = mongoose.Schema({

    // user:{type:ObjectId, ref:"user", required:true },

    orderItems:[{
        product: { type:ObjectId, ref:"product", required:true },
        quantity:{type:Number, required:true },
        totalItemPrice:{type:Number, required:true },
        price:{type:Number, required:true }
}],

    shipping:{
      city:{type:String, required:true},
      country:{type:String, required:true},
      address:{type:String, required:true}
    },
        
    paymentmethod:{type:String, required:true},

    // paymentresult:{                //
    //     status:{type:String},
    //     paidAt:{type:Date},
    //     email_address: { type: String },
    //   },
    
    // isPaid:{type:Boolean, required:true,default:false},

    // taxPrice: {
    //     type: Number,
    //     required: true,
    //     default: 0.0,
    //   },
  
    //   shippingPrice: {
    //     type: Number,
    //     required: true,
    //     default: 0.0,
    //   },
  
      totalPrice: {
        type: Number,
        required: true,
      },
  
      // isDelivered:{type:Boolean, required:true },
 
      // deliveredAt:{ type:Date },          //
},
{
  timestamps: true,
}
);

const order = mongoose.model("order", orderSchema);
module.exports = order;
    
