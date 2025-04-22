// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice'; 
import authReducer from './features/authSlice';
import cartReducer from './features/cartSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth:authReducer,
    cart:cartReducer,                               //auth is slice name through  which u can managae state of authentication(userData) and authReducer are the wrappped functions that allow to modify this state
  },
   
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch); // Sets up listeners for efficient async handling


// By concatenating apiSlice.middleware to the default middleware,
//  you ensure that all the functionality provided by Redux Toolkit Query is included in your Redux store. 
//  This is crucial for the API slice to function correctly, 
// as it needs to intercept actions related to API calls and handle them appropriately.