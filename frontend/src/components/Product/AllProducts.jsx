import React, { useEffect, useState } from 'react'
import { useSearchProductsQuery } from '../../redux/api/ProductApiSlice';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import { useLocation } from 'react-router-dom';
import Pagination from './Pagination';

function AllProducts() {
const navigate= useNavigate()
const useQuery=()=>{
    return new URLSearchParams(useLocation().search);  //enables to extract query from url

}
const[page,setPage]=useState(1)
const[status,setStatus]=useState(true)
const temp=useQuery().get('temp') || "";

useEffect(() => {
    navigate(`/search?temp=${temp}&page=${page}`);
  }, [page, temp, navigate]);

const{data, error, isLoading}=useSearchProductsQuery({temp,page})
console.log(data)

useEffect(() => {
    if (data && data.products.length === 0) {
      setStatus(false);
    }
    else{
        setStatus(true);
    }
  }, [data]);

if (isLoading) return <div>Loading...</div>;
if (error) return <div>Error loading products</div>;



const pageChange=(page)=>{
setPage(page)

  }
  return (

    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Search Results</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.products.length ? (
        data.products.map((product) => (
            <ProductCard key={product._id} product={product} />

        ))
      ) : (

        <p>No products found.</p>
      )}
    </div>
    {status &&(
    <Pagination
    totalpages={data.totalpages}
    currentpage={page}
    onPageChange={pageChange}

    />
    )}
    </div>

  )
}

export default AllProducts

//when user enter name it saved to state
//when it press enter it did navigate to new page which has name as query
//now this component extract temp (name) from url and using page logic send it to backend and recieve products
// and whenver page changes useffect is executed and and navigate to new url which contains new page and which renders again allproducst compoenent with new features