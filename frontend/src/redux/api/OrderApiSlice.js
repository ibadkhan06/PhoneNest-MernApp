import { ORDER_URL } from '../constants'; 
import { apiSlice } from "./apiSlice";

export const orderApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({

      
        placeOrder: builder.mutation({
            query: (data) => ({
              url: `${ORDER_URL}`,
              method: "POST",
              body: data,
            }),
          }),
})
})
export const {usePlaceOrderMutation}=orderApiSlice;