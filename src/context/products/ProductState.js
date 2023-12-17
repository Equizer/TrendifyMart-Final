import React, { useState } from 'react'
import ProductContext from './ProductContext';
const ProductState = (props) => {
  const [product, setProduct] = useState([]);

  const port = 'http://localhost:5000'
  const fetchAllProducts = async () =>{ 
    const response = await fetch(`${port}/api/products/fetchallproducts`, {
      method: 'GET',
      headers: {
        "content-type": "application/json"
      }
    });
    const json = await response.json();
    setProduct(json);
    console.log(json);
  }

  const addProduct = async (imageUrl, name, rating, priceCents, keywords) => {
    const response = await fetch(`${port}/api/products/addproduct`, {
      method: 'POST',
      headers: {
        "content-type": "json/application",
        "auth-token": ""/*TODO ( get auth-token from the local storage after setting it when a user logs in or signs up ) */
      },
      body: JSON.stringify({
        imageUrl: imageUrl,
        name: name,
        rating: rating,
        priceCents: priceCents,
        keywords: keywords
      })
    });
    const json = await response.json();
    console.log(json);
  }
  
  return(
    <ProductContext.Provider value={{fetchAllProducts}}>
      {props.children}
    </ProductContext.Provider>
  );
}

export default ProductState