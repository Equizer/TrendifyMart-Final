import React, { useContext, useState } from 'react'
import ProductContext from '../../context/products/ProductContext'
import SellerProductItem from './SellerProductItem';
import EditProduct from './EditProduct';

const SellerProduct = () => {
  const productContext = useContext(ProductContext);
  const { sellerProducts } = productContext;
  const [conditionState, setConditionState] = useState('new');


  const [productDetails, setProductDetails] = useState({ id: '', name: "", description: "", imageUrl: "", rating: { stars: 0, count: 0 }, keywords: [], condition: conditionState, inStock: true, priceCents: 0 });


  const handleUpdateProduct = (currentProduct) => {
    setProductDetails({ _id: currentProduct._id, name: currentProduct.name, description: currentProduct.description, imageUrl: currentProduct.imageUrl, rating: currentProduct.rating, condition: conditionState, inStock: currentProduct.inStock, priceCents: currentProduct.priceCents, keywords: currentProduct.keywords });
  }

  return (
    <>
      <div className='container my-5 mx-5'>
        <div className='row'>
          {sellerProducts.map((product) => {
            return (<SellerProductItem key={product._id} id={product._id} imageUrl={product.imageUrl} name={product.name} description={product.description} rating={product.rating} priceCents={product.priceCents} keywords={product.keywords} inStock={product.inStock} condition={product.condition} handleUpdateProduct={handleUpdateProduct} conditionState={conditionState}/>)
          })}
        </div>
      </div>
    <EditProduct productDetails={productDetails} setProductDetails={setProductDetails} conditionState={conditionState} setConditionState={setConditionState}/>
    </>
  )
}

export default SellerProduct
