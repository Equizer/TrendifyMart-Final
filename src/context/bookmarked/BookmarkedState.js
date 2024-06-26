import { useState, useContext } from 'react';
import BookmarkedContext from './BookmarkedContext'
import AlertContext from '../alert/AlertContext';

const BookmarkedState = (props) => {
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const alertContext = useContext(AlertContext);
  const { displayAlert } = alertContext;
  const port = 'https://trendifymart-backend.onrender.com';

  
  const fetchUserBookmarkedItems = async () => {
    props.setProgress(15);
    const response = await fetch(`${port}/api/bookmarkeditems/fetchuserbookmarkeditems`, {
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    });
    props.setProgress(45);
    const json = await response.json();
    props.setProgress(75);

    if (json.success) {
      setBookmarkedItems(json.allBookmarkedItems);
    }
    props.setProgress(100);

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
      displayAlert('success', json.message);
    }
  }

  return (<BookmarkedContext.Provider value={{ bookmarkedItems, addBookmark, fetchUserBookmarkedItems, setBookmarkedItems }}>
    {props.children}
  </BookmarkedContext.Provider>)
}

export default BookmarkedState;
