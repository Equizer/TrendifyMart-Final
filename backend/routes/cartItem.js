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
  body('quantity', 'Enter the quantity of the product').notEmpty()
], fetchuser, async (req, res) => {
  let success = false;
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success, error: errors.array() })
    }
    let product = await Product.findById(req.params.productId);

    let allProducts = await CartItem.find({ userId: req.user.id });  // TODO: now we have to find a way to iterate thru the allProduct array and if we find product._id matches one of the allProduct productId field then we just need to increment the quantity and not add the entire product again (try if fetch works here and if it does we can use the endpoint that edits quantity and we will provide that endpoint to increment the quantity by one idk if it would work but just suggesting just do it when we have time I KNOW WE ARE THE BEST!)  
    // here we have a problem that .find is gonna give us the first document with that product id but it could be that the cart has 2 same product like 2 users have same product in the cart and second user tries to add the product again to the cart and if in the cart item schema we recieve the other user's product then the product will be added again in the cart item
    // if (req.user.id === cartProduct.userId) {
    //   return res.status(400).json({ success, error: 'Product Already exists in the cart' });
    // }



    if (!product) {
      return res.status(400).json({ success, error: 'Product not Found' });
    }


    // TODO - ( TO AVOID DUPLICATED ITEMS IN THE CART WE CAN DO THE FOLLOWING ) WE CAN USE THE PRODUCT ID THAT WE HAVE SAVED WITH EVERY CART ITEM TO CHECK BEFORE ADDING THE CART ITEM IF THE ITEM ALREADY EXISTS AND IF THE PRODUCT WE ARE TRYING TO ADD ALREADY EXISTS THEN WE CAN NOT ADD THE CARTITEM BUT JUST INCREMENT THE QUANTITY BY 1

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

router.put('/editquantity/:productId', [
  body('quantity', 'Enter quantity!').notEmpty()
], fetchuser, async (req, res) => {
  let success = false;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ success, error: errors.array() });
    }
    if (req.body.quantity <= 0) {
      return res.status(400).json({ success, error: 'Cannot set the quantity to negative or null' })
    }

    let product = await CartItem.findById(req.params.productId);

    if (!product) {
      return res.status(400).json({ success, error: 'Product not found' });
    }

    if (req.user.id !== product.userId) {
      return res.status(400).json({ success, error: 'Not Allowed!' });
    }

    product = await CartItem.findByIdAndUpdate(req.params.productId, { $set: { quantity: req.body.quantity } }, { new: true, runValidations: true }) /*new: true: When new is set to true, the findByIdAndUpdate() method returns the updated document after the update operation has been applied. By default, without new: true, it returns the document as it was before the update.
    runValidators: true: Setting runValidators to true ensures that Mongoose runs any validation checks defined in the schema before performing the update. These validations can include checking for required fields, data types, custom validators, and other constraints specified in the schema. If any of these validations fail, the update operation will be rejected, and the document won't be updated.*/

    success = true;
    return res.json({ success, message: 'Cart quantity updated', product });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success, error: 'Internal server error occured!' });
  }
})
module.exports = router;