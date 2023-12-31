const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const { body, validationResults } = require('express-validator');


//                                TODO
// ROUTE 1: Fetch Cart Items (according to seller) : GET : '/api/cartitems/fetchcartitems' login required   
router.get('/fetchcartitems', fetchuser, async (req, res) => {
  let success = false;
  try {

  } catch (error) {
    console.log(error);
    return res.status(400).json({ success, error: 'Internal server error occured!' });
  }
});





// ROUTE 2: Add a product to Cart: '/api/cartitems/addtocart' login required   

router.post('/addtocart/:productId', fetchuser, async (req, res) => {
  let success = false;
  try {
    let product = await Product.findById(req.params.productId);
    

    if (!product) {
      return res.status(400).json({ success, error: 'Product not Found' });
    }

    product = {
      sellerId: product.sellerId,
      imageUrl: product.imageUrl,
      name: product.name,
      description: product.description,
      rating: {
        stars: product.rating.stars,
        count: product.rating.count
      },
      priceCents: product.priceCents,
      keywords: product.keywords,
      inStock: product.inStock,
      condition: product.condition,
    }

    const addProduct = await CartItem.create(product);
    success = true;
    return res.json({ success, message: 'Product added to the Cart', product: addProduct });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success, error: 'Internal server error occured!' });
  }
});

module.exports = router;