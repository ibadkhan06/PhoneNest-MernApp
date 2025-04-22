import {useUploadProductImageMutation,useCreateProductMutation}from "../../redux/api/ProductApiSlice"
import {useGetCategoriesQuery}from "../../redux/api/CategoryApiSlice"
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

function ProductCreate(){
const navigate = useNavigate();

const [name, setName] = useState("");
const [price, setPrice] = useState(0); 
const [quantity, setQuantity] = useState(0); 
const [brand, setBrand] = useState("");
const [image, setImage] = useState("");
const [imageUrl, setImageUrl] = useState("");
const [category, setCategory] = useState("");

const[uploadImage]=useUploadProductImageMutation()
const[CreateProduct]=useCreateProductMutation()     // in array because we have to send data to hook,first elemet enables us to perform mutation
const {data:categories}=useGetCategoriesQuery()     // in curly braces because we have to extract data



const handleSubmit= async (e)=>{
e.preventDefault()

    const form=new FormData();
    form.append("image",image)
    form.append("name",name)
    form.append("price",price)
    form.append("quantity",quantity)
    form.append("brand",brand)
    form.append("category",category)
  
    
// unwrap returns promise if it is resolved then it returns data otherwise it would be caught by catch block
//it provided advantage over checking manually that respone does have error or not 
    try {
        const data = await CreateProduct(form).unwrap();
        toast.success(`${data.name} is created`);
        navigate("/");
    } catch (error) {
        console.error(error);
        toast.error("Product create failed. Try Again.");
    }
    
}
const uploadFileHandler=async (e)=>{
    const formImage=new FormData();
    formImage.append("image",e.target.files[0])
    try{
const response=await uploadImage(formImage).unwrap()
toast.success(response.message)
setImage(response.image)
setImageUrl(response.image)
    }
    catch (error) {
        console.error(error);
        toast.error("Try Again.");
      }
}

return (
    <div className="min-h-screen flex justify-center items-center bg-slate-600">
      <div className="w-full max-w-4xl p-6 bg-slate-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-white mb-4">Create Product</h1>

        {imageUrl && (
          <div className="text-center mb-4">
            <img
              src={`http://localhost:4000${imageUrl}`}
              alt="product"
              className="block mx-auto max-h-[200px]"
            />
          </div>
        )}

        <div className="mb-3">
          <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
            {image ? image.name : "Upload Image"}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={uploadFileHandler}
              className="hidden"
            />
          </label>
        </div>

        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-white">Name</label>
            <input
              type="text"
              className="p-4 w-full border rounded-lg bg-[#101011] text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-white">Quantity</label>
            <input
              type="number"
              className="p-4 w-full border rounded-lg bg-[#101011] text-white"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-white">Brand</label>
            <input
              type="text"
              className="p-4 w-full border rounded-lg bg-[#101011] text-white"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-white">Price</label>
            <input
              type="number"
              className="p-4 w-full border rounded-lg bg-[#101011] text-white"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="w-full px-2 mb-4">
            <label className="block text-white">Category</label>
            <select
              className="p-4 w-full border rounded-lg bg-[#101011] text-white"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Choose Category</option>
              {categories?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="py-4 px-10 mt-5 w-full rounded-lg text-lg font-bold bg-pink-600 text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default ProductCreate;

// const [CreateProduct] = useCreateProductMutation();
// This hook is likely a custom hook from a library like RTK Query, which provides a mutation function for creating a product. You are using array destructuring to extract the mutation function CreateProduct because the hook returns an array where the first element is the function to call to perform the mutation. The comment about sending data to the hook is correct because typically, you'll call CreateProduct with the data you want to send.

// const { data: categories } = useGetCategoriesQuery();
// This hook is likely a custom hook that fetches data (categories in this case) from an API. You are using object destructuring to extract the data property from the result of the hook call and renaming it to categories. This is a common pattern when you need to access specific properties from an object returned by a query hook.

// When you use unwrap(), the mutation function returns a promise that resolves with the response data directly if the request is successful, or it throws an error if the request fails. This simplifies error handling and avoids the need to manually check the response structure