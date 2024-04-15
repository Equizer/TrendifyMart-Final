import { useState } from 'react';
import BookmarkedContext from './BookmarkedContext'

const BookmarkedState = (props) => {
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const port = 'http://localHost:5000';
  
  const fetchUserBookmarkedItems = async () => {
    const response = await fetch(`${port}/api/bookmarkeditems/fetchuserbookmarkeditems`, {
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    if (json.success) {
      setBookmarkedItems(json.allBookmarkedItems);
    }
    console.log(bookmarkedItems);
  }

  const addBookmark = async (productId, quantity) => {
    const response = await fetch(`${port}/api/bookmarkeditems/addbookmark/${productId}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ quantity })
    });
    const json = await response.json();
    if (json.success) {
      setBookmarkedItems(bookmarkedItems.concat(json.addProduct));
      console.log(bookmarkedItems);
    }
  }

  return (<BookmarkedContext.Provider value={{ bookmarkedItems, addBookmark, fetchUserBookmarkedItems }}>
    {props.children}
  </BookmarkedContext.Provider>)
}

export default BookmarkedState;
