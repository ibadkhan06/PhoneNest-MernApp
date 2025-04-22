const order = require('../models/orders');
const product = require('../models/products');
const {handleErrors} =require("../utils/handleerror")

const createorder = async(req,res)=>{
    try{
      const { cartItems: orderItems, shippingAddress:shipping, paymentMethod:paymentmethod,totalPrice } = req.body;

      console.log(req.body)
      console.log('Received orderItems:', orderItems);
    const populatedorderItems= await Promise.all( orderItems.map(async(item )=> { 
      console.log("Product-->")                                        //cannot directly use await inside map have to place async before
        const Product = await product.findById( item._id)
        console.log(Product)
        if(!Product){
            throw new Error(`Product with ID ${item._id} not found`);
        }
        return{
            product:item._id, quantity: item.quantity,price:item.price, totalItemPrice:item.price*item.quantity
        }
    })) 

// const totalPrice= populatedorderItems.reduce((total,item)=>item.price+total, 0)
// user:req.user._id, 
const neworder = new order({ orderItems:populatedorderItems, shipping, paymentmethod,totalPrice })
const createdorder = await neworder.save()

res.status(201).json({createdorder})
}
catch(error){  
    const err= handleErrors(error)                               
    res.status(500).json(err)         
}
} 

const seemyorder = async(req,res)=>{
    try{
const myorders= await order.find({user : req.user._id}).populate("user","email")
if(!myorders){
    return res.status(404).json({message:"you donot placed any order yet"})
}
res.status(200).json(myorders)
    }
    catch(error){                               
        res.status(500).json({error})         
    }
    }    
    
    const totalsale = async(req,res)=>{                    //total prices of all orders (sum)
        try{
            const myorders= await order.find()
            if(!myorders){
                return res.json({message:"no sale yet"})
            }
            const totalsales = myorders.reduce((total,item)=>item.totalPrice+total,0)
            res.status(200).json({totalsales})
    }
    catch(error){                               
        res.status(500).json({error})         
    }
    }
 
    const markOrderAsPaid = async(req,res)=>{                    
        try{
            const Order = await order.findById(req.params.id).populate('user')
            if(!Order && Order.length==0){
                return res.status(404).json({message:"no order with this id"})
            }
            Order.isPaid= true
            Order.paymentresult={            
                status: "paid",
                paidAt: Date.now(),
                email_address: Order.user.email,
              }
              const updatedorder=await Order.save()

              const response={
                paymentresult:updatedorder.paymentresult,
                paymentmethod:updatedorder.paymentmethod
              }
              res.status(200).json({response})

            }
            catch(error){            
                console.error(error)                   
                res.status(500).json({error})         
            }
        }

        const markOrderAsDelivered = async(req,res)=>{                    
            try{
                const Order = await order.findById(req.params.id)
                if(!Order && Order.length==0){
                    return res.status(404).json({message:"no order with this id"})
                }
                Order.isDelivered= true
                Order.deliveredAt=Date.now()
                  
                const updatedorder=await Order.save()
    
                  const response={
                    isDelivered:updatedorder.isDelivered,
                    deliveredAt:updatedorder.deliveredAt
                  }
                  res.status(200).json({response})
    
                }
                catch(error){            
                    console.error(error)                   
                    res.status(500).json({error})         
                }
            }    
            
            const calcualteTotalSalesByDate = async (req, res) => {
                try {
                    const salesbydate= await order.aggregate([
                        {
                      $match:{          //filter only those docs that are paid
                        isPaid:true
                      },
                      $group:{
                        _id:{            //group by docs on the basis of paidAt dates
                            $dateToString:{ format: "%Y-%m-%d", date: "$paidAt" }
                        },
                        totalsales:{$sum: "$totalPrice"}               //in each group sum their total prices
                      }

                }])    
                res.status(200).json({totalsales})       
            }
            catch(error){            
                console.error(error)                   
                res.status(500).json({error})         
            }
        } 
        const calculateTotalSalesByShippingPrice = async (req, res) => {
            try {
              const salesByShippingPrice = await Order.aggregate([
                {
                  $match: {
                    isPaid: true, // Only include orders that are marked as paid
                  },
                },
                {
                  $group: {
                    _id: "$shippingPrice", // Group by the shipping price
                    totalSales: { $sum: "$totalPrice" }, // Sum the total price for each group
                    numberOfOrders: { $sum: 1 }, // Count the number of orders in each group
                  },
                },
                {
                  $project: {
                    _id: 0, // Exclude the default _id field
                    shippingPrice: "$_id", // Include the shipping price in the output
                    totalSales: 1, // Include the total sales in the output
                    numberOfOrders: 1, // Include the number of orders in the output
                  },
                },
                {
                  $sort: { shippingPrice: 1 } // Sort by shipping price in ascending order
                }
              ]);
          
              res.json(salesByShippingPrice); // Send the aggregated data as JSON response
            } catch (error) {
              res.status(500).json({ error: error.message }); // Send error message if something goes wrong
            }
          };
          

module.exports={createorder,seemyorder, totalsale, markOrderAsPaid, markOrderAsDelivered}

 