import React, { useContext, useEffect } from "react";
import BookmarkedContext from "../context/bookmarked/BookmarkedContext"; 


const Saved = () => {
  const bookmarkedContext = useContext(BookmarkedContext);
  const { fetchUserBookmarkedItems } = bookmarkedContext;

  const fetchUserBookmarkedItemsFunc = async () => {
    fetchUserBookmarkedItems();
  }

  useEffect(() => {
    fetchUserBookmarkedItemsFunc();
  }, []); 
  return (null)
}

export default Saved