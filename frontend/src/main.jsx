// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store'; // Import the store
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Cart,Login, Signup,ProductCreate,HomePage,ProductDetail,AllProducts,Checkout,OrderSummary} from './components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },

      {
        path: '/product/:id',
        element: <ProductDetail />,
      },
      {
        path: '/search',
        element: <AllProducts/>,
      },
      {
        path: '/cart',
        element: <Cart/>,
      },
     
      
    ],
  },
  {
    path: '/checkout',
    element: <Checkout/>,
  },
    {
      path: '/create-product',
      element: <ProductCreate />,
    },
    {
      path: '/order-summary',
      element: <OrderSummary/>,
    },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> 
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
