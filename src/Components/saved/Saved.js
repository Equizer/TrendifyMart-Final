import React, { useState, useContext, useEffect } from "react";
import BookmarkedContext from "../../context/bookmarked/BookmarkedContext";
import ProductItem from "../home/ProductItem";
import { Link } from "react-router-dom";
import RatingStarModal from "../RatingStarModal";


const Saved = () => {
  const bookmarkedContext = useContext(BookmarkedContext);
  const { fetchUserBookmarkedItems, bookmarkedItems } = bookmarkedContext;
  const [currentStarProductName, setCurrentProductName] = useState('');

  const fetchUserBookmarkedItemsFunc = async () => {
    fetchUserBookmarkedItems();
  }

  useEffect(() => {
    fetchUserBookmarkedItemsFunc();
  }, []);

  return (
    <>
      <h1 className=" margin-top-88 justify-content-center align-items-center">Bookmarked  Items</h1>
      {localStorage.getItem('token') ? <div className="container my-5 mx-5">
        <div className="row">
          {bookmarkedItems.length === 0 ? <div><h3>No Bookmarked Items</h3><h5 className="mt-4">Go to <Link to="/home" className="btn btn-primary">Home</Link> to add bookmarks</h5></div> : bookmarkedItems.map((item) => {
            return item && <React.Fragment key={item._id}>
              <ProductItem name={item.name} imageUrl={item.imageUrl} description={item.description} rating={item.rating} priceCents={item.priceCents} keywords={item.keywords} id={item.productId}  inStock={item.inStock} isBookmarked={true} currentStarProductName={currentStarProductName} setCurrentProductName={setCurrentProductName} />
              {/* One thing to note here is now we are sending item.productId instead of item._id as we search with the product's id before adding to the cart and in this case the product's id is productId unlike in the file Product.js where the product's id was _id */}
              <RatingStarModal currentStarProductName={currentStarProductName} setCurrentProductName={setCurrentProductName} id={item.productId} name={item.name} />
            </React.Fragment>
          })}
        </div>
      </div> : <div className="card text-bg-info mb-3" style={{ "max-width": "18rem" }}>
        <div className="card-header">You are not Signed in!</div>
        <div className="card-body">
          <h5 className="card-title">Authentication Required</h5>
          <p className="card-text">Login or Signup as a buyer to access your Bookmarked Items.</p>
          <Link className='btn btn-primary' to="/login">Login</Link>
          <Link className='btn btn-primary mx-2' to="/signup">Signup</Link>
        </div>
      </div>}
    </>
  );
}

export default Saved