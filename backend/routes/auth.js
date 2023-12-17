const express = require('express')
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')


// Route 1: Create a user - POST '/api/auth/signup' no login required

router.post('/signup', [
  body('name',).isLength({ min: 4 }),
  body('email', 'Invalid Email').isEmail(),
  body('password', 'Password must contain atleast 6 characters').isLength({ min: 6 }),
  body('gender', 'Enter your gender').notEmpty(),
  body('dob', 'Enter your Date of Birth').notEmpty()
], async (req, res) => {
  // const secret = process.env.JWT_SECRET;
  const JWT_SECRET = 'equizer&pro';
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ success, message: 'A user with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const securedPassword = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: securedPassword,
      gender: req.body.gender,
      dob: req.body.dob,
      dateJoined: req.body.dateJoined
    });

    // we could simply do this like const data = user._id but we do this nesting so that in future if we want to send some more data as payload in authToken so that we can use them in our frontend it will be more easy
    //we can add a field in here that has a name role and that will determine whether the user is a buyer or a seller then in the frontend we can decide whether to let the user access some features like adding a product to the application should be allowed to only a seller not a buyer
    const data = {
      user: {
        id: user._id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);

    success = true;

    return res.json({ success, message: "User Registered!", authToken });

  } catch (error) {
    console.error("Error", error)
    return res.status(500).json({ error: 'Interval error occured!' })
  }
});

// ROUTE 2: Log in - GET: 'api/auth/login no login required

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'password cannot be empty').notEmpty()
], async (req, res) => {

  const JWT_SECRET = 'equizer&pro';
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, error: errors.array() });
  }

  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ success, error: 'User not found' });
    }
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(400).json({ success, error: 'Invalid password' });
    }

    const data = {
      user: {
        id: user._id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET);

    success = true;

    return res.json({ success, message: "Logged In", authToken });

  } catch (error) {
    console.error("Error", error)
    return res.status(500).json({ success, error: 'Interval error occured!' })
  }
});

// ROUTE 3: get user details: GET 'api/auth/getuserdetails' login required

router.get('/getuserdetails', fetchuser, async (req, res) => {

  let success = false;
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(400).json({ success, error: 'User not found!' });
    }
    success = true;

    return res.json({ success, user });
  } catch (error) {
    console.error("Error", error)
    return res.status(500).json({ success, error: 'Interval error occured!' })
  }
});

//ROUTE 4: Delete user: DELETE 'api/auth/deleteuser' login required
router.delete('/deleteuser', fetchuser, async (req, res) => {
  let success = false;
  
  try {
    const userId = req.user.id;

    let userToDelete = await User.findById(userId);

    if (!userToDelete) {
      return res.status(400).json({ success, error: 'User not found' });
    }
    success = true;
    userToDelete = await User.findByIdAndDelete(userId);

    return res.status(400).json({ success, message: 'User Deleted', deletedUser: userToDelete });

  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ success, error: 'Interval server error occured' });
  }
});


module.exports = router;