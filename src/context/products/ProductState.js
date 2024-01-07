import React, { useContext, useState } from 'react'
import ProductContext from './ProductContext';
import ProgressContext from '../progress/ProgressContext';
import AlertContext from '../../context/alert/AlertContext'

const ProductState = (props) => {
  const progressContext = useContext(ProgressContext);
  const { setProgress } = progressContext;
  const alertContext = useContext(AlertContext);
  const { displayAlert } = alertContext;
  const [products, setProducts] = useState([]);
  const [sellerProducts, setSellerProducts] = useState([]);


  const port = 'http://localhost:5000';
  const fetchAllProducts = async () => {
    setProgress(15);
    const response = await fetch(`${port}/api/products/fetchallproducts`, {
      method: 'GET',
      headers: {
        "content-type": "application/json"
      }
    });
    setProgress(45);
    const json = await response.json();
    setProgress(80);
    setProducts(json.allProducts);
    setProgress(100);
  }

  const addProduct = async (name, imageUrl, description, rating, priceCents, keywords, condition, inStock) => {
    setProgress(15);
    const product = { name, imageUrl, rating, priceCents, keywords, condition };
    const response = await fetch(`${port}/api/products/addproduct`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem('sellerToken')
      },
      body: JSON.stringify({
        imageUrl: imageUrl,
        name: name,
        rating: rating,
        description: description,
        condition: condition,
        inStock: inStock,
        priceCents: priceCents,
        keywords: keywords
      })
    });
    setProgress(45);
    const json = await response.json();
    setProgress(80);

    if (json.added) {
      setProducts(products.concat(product));
    }

    if (json.success) {
      displayAlert('success', 'Product Added SuccessFully!');
    }
    else if (json.error === 'No token found!') {
      displayAlert('danger', 'Product was not Added!');
    }
    setProgress(100);
  }

  const fetchSellerProducts = async () => {
    setProgress(15);
    const response = await fetch(`${port}/api/products/fetchsellerproducts`, {
      method: 'GET',
      headers: {
        "auth-token": localStorage.getItem('sellerToken')
      }
    });
    setProgress(45);

    const json = await response.json();
    setProgress(80);

    if (json.success) {
      setSellerProducts(json.products);
    }
    else if (!json.success) {
      displayAlert('danger', 'An error occured while fetching your products');
    }
    setProgress(100);


  }

  const deleteProduct = async (productId) => {
    const response = await fetch(`${port}/api/products/deleteproduct/${productId}`, {
      method: 'DELETE',
      headers: {
        'auth-token': localStorage.getItem('sellerToken')
      }
    });
    const json = await response.json();
    if (json.success) {
      const newProducts = sellerProducts.filter((product) => { return product._id !== productId });
      setSellerProducts(newProducts);
      displayAlert('warning', 'Product Deleted SuccessFully!');
    }
    else {
      displayAlert('danger', 'Product was not deleted');
    }
  }

  const editStock = async (productId, newStockState) => {
    setProgress(15);

    const response = await fetch(`${port}/api/products/editstock/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        "auth-token": localStorage.getItem('sellerToken')
      },
      body: JSON.stringify({ inStock: newStockState })
    });
    setProgress(45);
    const json = await response.json();
    setProgress(80);
    if (json.success) {
      displayAlert('info', 'Stock Updated SuccessFully!');
    }
    else {
      displayAlert('danger', 'Stock was not updated');
    }
    setProgress(100);

  }

  return (
    <ProductContext.Provider value={{ products, fetchAllProducts, addProduct, fetchSellerProducts, sellerProducts, deleteProduct, editStock }}>
      {props.children}
    </ProductContext.Provider>
  );
}

export default ProductState