import React from 'react'

function Pagination({totalpages,currentpage,onPageChange}) {
    const pages = [...Array(totalpages).keys()].map(num => num + 1);

  return (
    
    <div className="flex justify-center my-4 mt-36">
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 px-3 py-1 border rounded ${page === currentpage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};


export default Pagination


//all the pages fetched data is transfered here and when user clicked on button it is send back to Allproducts component 
// and page state changes and when page state changes useEffect is called and new page is loaded