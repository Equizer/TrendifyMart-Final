const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Fetch Cart Items (according to seller) : GET : '/api/cartitems/fetchcartitems' login required   
router.get('/fetchcartitems', fetchuser, async (req, res) => {
  let success = false;
  try {
    const userId = req.user.id;
    const allProducts = await CartItem.find({ userId });
    success = true;
    return res.json({ success, allProducts });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success, error: 'Internal server error occured!' });
  }
});





// ROUTE 2: Add a product to Cart: '/api/cartitems/addtocart' login required   

router.post('/addtocart/:productId', [
  // body('quantity', 'Enter the quantity of the product').notEmpty()
], fetchuser, async (req, res) => {
  let success = false;
  try {
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ success, error: errors.array() })
    // }
    let product = await Product.findById(req.params.productId);


    if (!product) {
      return res.status(400).json({ success, error: 'Product not Found' });
    }


    // WE CAN USE THE PRODUCT ID THAT WE HAVE SAVED WITH EVERY CART ITEM TO CHECK BEFORE ADDING THE CART ITEM IF THE ITEM ALREADY EXISTS AND IF THE PRODUCT WE ARE TRYING TO ADD ALREADY EXISTS THEN WE CAN NOT ADD THE CARTITEM BUT JUST INCREMENT THE QUANTITY BY 1

    product = {
      productId: product._id,
      sellerId: product.sellerId,
      userId: req.user.id,
      imageUrl: product.imageUrl,
      name: product.name,
      description: product.description,
      rating: {
        stars: product.rating.stars,
        count: product.rating.count
      },
      quantity: req.body.quantity,
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

// ROUTE 3: Delete a product from Cart: DELETE: '/api/cartitems/deletefromcart' login required

router.delete('/deletefromcart/:productId', fetchuser, async (req, res) => {
  let success = false;
  try {
    let product = await CartItem.findById(req.params.productId);
    if (!product) {
      return res.status(400).json({ success, error: 'Product not found in Cart' });
    }
    if (req.user.id !== product.userId) {
      return res.status(400).json({ success, error: "Not Allowed!" });
    }
    product = await CartItem.findByIdAndDelete(req.params.productId);
    success = true;
    return res.json({ success, message: 'Product Deleted', product });

  } catch (error) {
    console.log(error);
    return res.status(400).json({ success, error: 'Internal server error occured!' });
  }
});

// ROUTE 4: Edit Cart item's quantity : PUT '/api/cartitems/editquantity' login required

router.put('/editquantity/productId', [
  body('quantity', 'Enter quantity!').notEmpty()
], fetchuser, async (req, res) => {
  let success = false;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ success, error: errors.array() });
    }

    let product = await CartItem.findById(req.params.productId);

    if (!product) {
      return res.status(400).json({ success, error: 'Product not found' });
    }

    if (req.user.id !== product.userId) {
      return res.status(400).json({ success, error: 'Not Allowed!' });
    }

    //                                    TODO

  } catch (error) {
    console.log(error);
    return res.status(400).json({ success, error: 'Internal server error occured!' });
  }
})
module.exports = router;