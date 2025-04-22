import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'; // Corrected import path


export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({baseUrl:BASE_URL,
    credentials: 'include',  // Ensure credentials (cookies) are included in requests
  }),
  tagTypes:['Product','Category','User','Order'],
  endpoints: () => ({}),
})

