const mongoose = require(`mongoose`);
const {isEmail}=require(`validator`);


const userSchema = mongoose.Schema({
    email:{
        type:String,
        required: [true,`must enter email`],
        unique:true,
        lowercase:true,
        validate:[isEmail,`must enter valid email`]
    },
    password:{
        type:String,
        minlength:[6,`must be of atleast 6 characters`],
        required: [true,`must enter password`],
        
    },
    isAdmin: {
        type: Boolean,
        default: false,
      },
      phone: {
        type:String,
        minlength:[11,`must enter 11 digits`],
        required: [true,`must enter phone number`],
      },
      city: {
        type:String,
        required: [true,`must enter city name`],
      },
    },
    { timestamps: true }
  );
    
    const user = mongoose.model(`user`,userSchema);
    module.exports = user;