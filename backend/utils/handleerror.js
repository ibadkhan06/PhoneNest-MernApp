const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {};
  
    // Handle duplicate key error (11000 error code)
    if (err.code === 11000) {
      Object.keys(err.keyPattern).forEach((key) => {            //err.keyPattern knows the field that caused the duplication
        errors[key] = `${key} must be unique`;                  //Object.keys(err.keyPattern) is an array that contains them
      });
      return errors;
    }
  
    // Handle validation errors
    if (err.message.includes('validation failed')) {
      Object.values(err.errors).forEach(({ properties }) => {          //err.errors is an object that contains detailed error information for each field that failed validation.
        errors[properties.path] = properties.message;                 //gives us an array of these error details
       
      });
    }
  
    return errors;
  };
  
  const priceError = (price) => {
    if(price >=0){
      return true;
    }
    return false
  }

module.exports={handleErrors,priceError}