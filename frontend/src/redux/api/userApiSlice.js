import { apiSlice } from "./apiSlice";

export  const userApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({

        register: builder.mutation({
            query: (data) => ({
                url: `api/users/register`,
                method: "POST",
                body: data,
                credentials: "include",
              }),
              invalidatesTags:['User']

    }),
    loginUser: builder.mutation({
        query: (data) => ({
            url: `api/users/login`,
            method: "POST",
            body: data,
            credentials: "include",
          }),
      

}),
logout: builder.query({
    query: () => ({
        url: `api/users/logout`,
        credentials: "include",
      }),
  

}),
})
})
  export const {useRegisterMutation,useLoginUserMutation,useLogoutQuery}=userApiSlice;         //Destructuring: This syntax is used to extract specific hooks from the userApiSlice objec