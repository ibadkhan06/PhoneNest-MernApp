import { createSlice } from "@reduxjs/toolkit";


const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")): { cartItems: [], shippingAddress: {}, paymentMethod: "" };
  const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {   //each element of array contains product and its quantity
          const item=action.payload
          const existing=state.cartItems.find((temp)=>temp._id===item._id)
if(existing){
    state.cartItems=state.cartItems.map((temp)=>temp._id===existing._id ? item : temp)
}
else{
    state.cartItems=[... state.cartItems,item]
    // state.cartItems.push(item)  why: because it is always recommended to create new state in redux
}

state.totalPrice=state.cartItems.reduce((acc,temp)=>acc+temp.price*temp.quantity,0)
localStorage.setItem("cart",JSON.stringify(state))
    },
   

    removeFromCart: (state, action) => { 
        state.cartItems = state.cartItems.filter((temp) => temp._id !== action.payload);
        state.totalPrice = state.cartItems.reduce((acc, temp) => acc + temp.price * temp.quantity, 0)
        localStorage.setItem("cart",JSON.stringify(state))
    },

    addShipping: (state, action) => { 
    state.shippingAddress=action.payload.address
    state.paymentMethod=action.payload.paymentMethod
    localStorage.setItem("cart",JSON.stringify(state))
    },
    clearOrder:(state, action) => { 
    state.cartItems=[],
    state.shippingAddress={},
    state.paymentMethod=""
    localStorage.setItem("cart",JSON.stringify(state))
        }
        }
})  

export const {addToCart,removeFromCart,addShipping,clearOrder}=cartSlice.actions;
export default cartSlice.reducer;