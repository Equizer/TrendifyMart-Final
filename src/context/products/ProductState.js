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


  const port = 'https://trendify-mart-final.vercel.app/';
  const fetchAllProducts = async () => {
    props.setProgress(15);
    const response = await fetch(`${port}/api/products/fetchallproducts`, {
      method: 'GET',
      headers: {
        "content-type": "application/json"
      }
    });
    props.setProgress(45);
    const json = await response.json();
    props.setProgress(80);
    setProducts(json.allProducts);
    props.setProgress(100);
  }

  const addProduct = async (name, imageUrl, description, rating, priceCents, keywords, condition, inStock) => {
    props.setProgress(15);
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
    props.setProgress(45);
    const json = await response.json();
    props.setProgress(80);

    if (json.added) {
      setProducts(products.concat(product));
    }

    if (json.success) {
      displayAlert('success', 'Product Added SuccessFully!');
    }
    else if (json.error === 'No token found!') {
      displayAlert('danger', 'Product was not Added!');
    }
    props.setProgress(100);
  }

  const fetchSellerProducts = async () => {
    props.setProgress(15);
    const response = await fetch(`${port}/api/products/fetchsellerproducts`, {
      method: 'GET',
      headers: {
        "auth-token": localStorage.getItem('sellerToken')
      }
    });
    props.setProgress(45);

    const json = await response.json();
    props.setProgress(80);

    if (json.success) {
      setSellerProducts(json.products);
    }
    else if (!json.success) {
      displayAlert('danger', 'An error occured while fetching your products');
    }
    props.setProgress(100);


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

  const editProduct = async (product) => {
    const response = await fetch(`${port}/api/products/editproduct/${product._id}`, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem('sellerToken')
      },
      body: JSON.stringify({
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        rating: {
          stars: product.rating.stars,
          count: product.rating.count
        },
        priceCents: product.priceCents,
        keywords: product.keywords,
        condition: product.condition,
        inStock: product.inStock
      })
    });
    const json = await response.json();
    if (json.success) {
      console.log('Product Edited')
    }
    else {
      console.log(json.error, 'Product not Edited!')
    }
  }

  const editStock = async (productId, newStockState) => {
    props.setProgress(15);

    const response = await fetch(`${port}/api/products/editstock/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        "auth-token": localStorage.getItem('sellerToken')
      },
      body: JSON.stringify({ inStock: newStockState })
    });
    props.setProgress(45);
    const json = await response.json();
    props.setProgress(80);
    if (json.success) {
      displayAlert('info', 'Stock Updated SuccessFully!');
    }
    else {
      displayAlert('danger', 'Stock was not updated');
    }
    props.setProgress(100);

  }

  const addRatingStars = async (productId, stars) => {
    const response = await fetch(`${port}/api/products/addStars/${[productId]}`, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ stars })
    });

    const json = await response.json();
    if (json.success) {
      console.log("Thanks for reviewing the product", json);
    }
    else {
      console.log('Something went wrong!', json)
    }
  }

  return (
    <ProductContext.Provider value={{ products, fetchAllProducts, addProduct, fetchSellerProducts, sellerProducts, deleteProduct, editStock, editProduct, addRatingStars }}>
      {props.children}
    </ProductContext.Provider>
  );
}

export default ProductState