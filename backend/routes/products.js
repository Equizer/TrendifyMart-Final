const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Product = require('../models/Product');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Fetch all the products: GET: /api/products/fetchallproducts' login required 

router.get('/fetchallproducts', async (req, res) => {
  let success = false;
  try {
    const allProducts = await Product.find();
    success = true;
    return res.json({ success, allProducts });
  } catch (error) {
    console.log('Errors: ', error);
    return res.status(500).json({ success, error: 'Internal server error occured' })
  }
});

// ROUTE 2: Add a product: '/api/products/addproduct' login required ([ seller only ] [ not for users ])
router.post('/addproduct', [
  body('imageUrl', 'Enter an image URL').notEmpty(),
  body('name', 'Product name must be atleast 5 character').isLength({ min: 5 }),
  body('description', 'Enter Product Description').notEmpty(),
  body('rating.stars', 'stars cannot be empty').notEmpty(),
  body('rating.count', 'count cannot be empty').notEmpty(),
  body('condition', 'Choose the condtion of your product').notEmpty(),
  body('priceCents', 'Enter a price for your product').notEmpty(),
  body('keywords', 'Enter some keywords for your product').notEmpty()
], fetchuser, async (req, res) => {
  let success = false;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ success, error: errors.array() })
  }

  try {
    const { imageUrl, name, description, rating, priceCents, keywords, condition } = req.body;

    const userId = req.user.id;

    if (!req.user.id) {
      return res.status(400).json({ success, error: 'Not allowed' });
    }


    const product = await Product.create({ userId, imageUrl, name, description, rating, condition, priceCents, keywords });
    success = true;
    return res.json({ success, product, message: 'Product Added Successfuly!' });

  } catch (error) {
    console.log("Error in addproduct route", error);
    return res.status(500).send(`Server Error`);
  }
});

// Route 3 : Delete a product : '/api/products/deleteproduct' login required ([ seller only ] [ not for users ])

router.delete('/deleteproduct/:productId', fetchuser, async (req, res) => {

  let success = false;

  try {
    let productToDelete = await Product.findById(req.params.productId);

    if (!productToDelete) {
      return res.status(400).json({ success, error: 'The product you are trying to delete does not exist!' })
    }
    if (req.user.id !== productToDelete.userId) {
      return res.status(401).json({ success, error: 'Not allowed!' });
    }

    productToDelete = await Product.findByIdAndDelete(req.params.productId);
    success = true;

    return res.json({ success, message: 'Product Deleted', deletedProduct: productToDelete })


  } catch (error) {
    console.log("Error in deleteproduct ", error);
    return res.status(500).send(`Server Error`);
  }

});


// ROUTE 4 : Edit a product : ''/api/products/editproduct' Log in required ([ seller only ] [ not for users ])

router.put('/editproduct/:productId', [
  body('imageUrl', 'Enter an image URL').notEmpty(),
  body('name', 'Product name must be atleast 5 character').isLength({ min: 5 }),
  body('rating.stars', 'stars cannot be empty').notEmpty(),
  body('rating.count', 'count cannot be empty').notEmpty(),
  body('condition', 'Choose the condtion of your product').notEmpty(),
  body('priceCents', 'Enter a price for your product').notEmpty(),
  body('keywords', 'Enter some keywords for your product').notEmpty()
], fetchuser, async (req, res) => {
  let success = false;
  try {
    const errors = validationResult(req);
    let newNote = {
      imageUrl: '',
      name: '',
      description: '',
      rating: {
        stars: 0,
        count: 0,
      },
      condition: '',
      priceCents: 0,
      keywords: []
    };

    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    let productToEdit = await Product.findById(req.params.productId);

    if (!productToEdit) {
      return res.status(400).json({ success, error: 'Product not found!' });
    }

    if (!productToEdit.userId === req.user.id) {
      return res.status(400).json({ success, error: 'Not Allowed!' });
    }

    if (req.body.imageUrl) { newNote.imageUrl = req.body.imageUrl; }
    if (req.body.name) { newNote.name = req.body.name; }
    if (req.body.description) { newNote.description = req.body.description }
    if (req.body.rating) {
      newNote.rating.stars = req.body.rating.stars;
      newNote.rating.count = req.body.rating.count;
    }
    if(condition) { newNote.condition = req.body.condition }
    if (req.body.priceCents) { newNote.priceCents = req.body.priceCents };
    if (req.body.keywords) { newNote.keywords = req.body.keywords };



    productToEdit = await Product.findByIdAndUpdate(req.params.productId, { $set: newNote }, { new: true });
    success = true;

    return res.json({ success, message: 'Product Edited', productEdited: productToEdit });


  } catch (error) {
    console.error('Error: ', error);
    return res.status(400).json({ success, error: 'Internal server error occured!' })
  }

});


// ROUTE 5: Fetch seller specific products: '/api/products/fetchsellerproducts' login required  ([ seller only ] [ not for users ])

router.get('/fetchsellerproducts', fetchuser, async (req, res) => {
  let success = false;

  try {

    let sellerProducts = await Product.find({ userId: req.user.id });
    success = true;

    return res.json({ success, products: sellerProducts });
  } catch (error) {
    return res.status(400).json({success, error: 'Internal server error occured!'});
  }
})




module.exports = router