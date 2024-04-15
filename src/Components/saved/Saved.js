import React, { useContext, useEffect } from "react";
import BookmarkedContext from "../../context/bookmarked/BookmarkedContext";
import ProductItem from "../home/ProductItem";


const Saved = () => {
  const bookmarkedContext = useContext(BookmarkedContext);
  const { fetchUserBookmarkedItems, bookmarkedItems } = bookmarkedContext;

  const fetchUserBookmarkedItemsFunc = async () => {
    fetchUserBookmarkedItems();
  }

  useEffect(() => {
    fetchUserBookmarkedItemsFunc();
  }, []);

  return (
    <>
      <h1 className=" margin-top-88 justify-content-center align-items-center">Bookmarked  Items</h1>
      <div className="container my-5 mx-5">
        <div className="row">
          {bookmarkedItems.map((item) => {
            return <ProductItem imageUrl={item.imageUrl} name={item.name} description={item.description} rating={item.rating} priceCents={item.priceCents} keywords={item.keywords} id={item.productId} key={item._id} inStock={item.inStock} />
            // One thing to note here is now we are sending item.productId instead of item._id as we search with the product's id before adding to the cart and in this case the product's id is productId unlike in the file Product.js where the product's id was _id
          })}
        </div>
      </div>
    </>
  );
}

export default Saved