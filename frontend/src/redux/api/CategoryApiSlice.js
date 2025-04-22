import { CATEGORY_URL } from '../constants'; 
import { apiSlice } from "./apiSlice";

export const categoryApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({

        getCategories: builder.query({
            query:()=>`${CATEGORY_URL}`,
            keepUnusedDataFor:5,
            providesTags:["Category"],
    }),

    }),
})

export const {useGetCategoriesQuery}=categoryApiSlice;