import React, { useContext, useState } from 'react'
import ProductContext from './ProductContext';
import ProgressContext from '../progress/ProgressContext';
const ProductState = (props) => {
  const progressContext = useContext(ProgressContext);
  const { setProgress } = progressContext;
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
    console.log(json);
    setProgress(100);
  }

  const addProduct = async (name, imageUrl, description, rating, priceCents, keywords, condition, inStock) => {
    const product = { name, imageUrl, rating, priceCents, keywords, condition };
    const response = await fetch(`${port}/api/products/addproduct`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem('token')
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
    const json = await response.json();
    if (json.success) {
      setProducts(products.concat(product));
      console.log(json);
      console.log(products);
    }
    else if (json.error === 'Invalid token!') {
      console.log(json.error)
    }

  }

  const fetchSellerProducts = async () => {
    const response = await fetch(`${port}/api/products/fetchsellerproducts`, {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem('token'),
      }
    });

    const json = await response.json();

    if (json.success) {
      setSellerProducts(json.products);
      console.log(json.products);
    }

  }

  const deleteProduct = async (productId) => {
    const response = await fetch(`${port}/api/products/deleteproduct/${productId}`, {
      method: 'DELETE',
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await  response.json();
    if (json.success) {
      const newProducts = sellerProducts.filter((product) => { return product._id !== productId });
      setSellerProducts(newProducts);
      console.log("Successfully deleted product!");
    }
    else {
      console.log("Error deleting product!");
    }
  }

  return (
    <ProductContext.Provider value={{ products, fetchAllProducts, addProduct, fetchSellerProducts, sellerProducts, deleteProduct }}>
      {props.children}
    </ProductContext.Provider>
  );
}

export default ProductState