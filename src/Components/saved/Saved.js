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
    <div className="container my-5 mx-5">
      <div className="row">
        {bookmarkedItems.map((item) => {
          return <ProductItem imageUrl={item.imageUrl} name={item.name} description={item.description} rating={item.rating} priceCents={item.priceCents} keywords={item.keywords} id={item._id} key={item._id} inStock={item.inStock} />
        })}
      </div>
    </div>
  );
}

export default Saved