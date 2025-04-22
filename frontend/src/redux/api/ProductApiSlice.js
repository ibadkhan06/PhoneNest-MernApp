import { PRODUCT_URL, UPLOAD_URL } from '../constants'
import { apiSlice } from "./apiSlice";

export const productApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
  
        topRated: builder.query({
            query:()=>`${PRODUCT_URL}/top`,
            keepUnusedDataFor:5,
            providesTags:["Product"],
    }),

    cheapProducts: builder.query({
      query:()=>`${PRODUCT_URL}/cheapest`,
      keepUnusedDataFor:5,
      providesTags:["Product"],
}),

getProduct: builder.query({
  query:(id)=>`${PRODUCT_URL}/${id}`,
  keepUnusedDataFor:5,
  providesTags: (result, error, id) => [{ type: 'Product', id }],
}),

    uploadProductImage: builder.mutation({
        query: (data) => ({
          url: `${UPLOAD_URL}`,
          method: "POST",
          body: data,
         
        }),
      }),

      createProduct: builder.mutation({
        query: (data) => ({
          url: `${PRODUCT_URL}`,
          method: "POST",
          body: data
        }),
        invalidatesTags:['Product']
      }),

      addReview: builder.mutation({
        query: ({id,dataToSend}) => ({
          url: `${PRODUCT_URL}/${id}`,
          method: "POST",
          body: dataToSend,
        }),
        invalidatesTags:['Product']
      }),

      filtered: builder.query({
        query:({})=>`${PRODUCT_URL}/filter`,
        keepUnusedDataFor:5,
  
  }),
  searchProducts: builder.query({
    query: ({ temp, page }) => ({
      url: `${PRODUCT_URL}/fetch`,
      params: {
        temp: temp,
        page: page
      },
    }),
    keepUnusedDataFor: 5,
  }),
  providesTags:["Product"],
}),
})
export const{useTopRatedQuery,useUploadProductImageMutation,useCreateProductMutation,useCheapProductsQuery
  ,useGetProductQuery,useSearchProductsQuery,useAddReviewMutation}=productApiSlice

