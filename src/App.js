import './App.css';
import About from './Components/About';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Components/home/Home';
import CartComponent from './Components/cart/CartComponent';
import Profile from './Components/Profile';
import Sidebar from './Components/Sidebar';
import ProgressState from './context/progress/ProgressState';
import ProductState from './context/products/ProductState';
import AlertState from './context/alert/AlertState';
import Signup from './Components/Signup';
import Login from './Components/Login';
import UserState from './context/user/UserState';
import Shop from './Components/shop/Shop';
import Alert from './Components/Alert';
import CartState from './context/cart/CartState';
import SellerSignup from './Components/SellerSignup'
import SellerLogin from './Components/SellerLogin';
import SellerState from './context/seller/SellerState';



function App() {
  // remember we have a field seller in our user so we can let the seller make a seller account even if they are not logged in or signed up as browsing thru products doesnt need authentications at all adding product to cart does so may be actually not wanna let the seller add products to the cart so using the user in the local storage we can determine whether to display  user info in profile using the fetchuserdata or using the fetchsellerdata also we can determine as in if we want to fetch cart items or not we will save that seller boolean in seller schema as well as user schema 
  return (
    <AlertState>
      <ProgressState>
        <SellerState>
          <UserState>
            <ProductState>
              <CartState>
                <Router>
                  <Navbar />
                  <div className='d-flex justify-content-start'>
                    <div>
                      <Sidebar />
                    </div>
                    <div className='container'>
                      <Alert />
                      <Routes>
                        <Route exact path='/home' element={<Home />} />
                        <Route exact path='/about' element={<About />} />
                        <Route exact path='/cart' element={<CartComponent />} />
                        <Route exact path='/profile' element={<Profile />} />
                        <Route exact path='/signup' element={<Signup />} />
                        <Route exact path='/login' element={<Login />} />
                        <Route exact path='/myshop' element={<Shop />} />
                        <Route exact path='/sellersignup' element={<SellerSignup />} />
                        <Route exact path='/sellerlogin' element={<SellerLogin />} />
                      </Routes>
                    </div>
                  </div>
                </Router>
              </CartState>
            </ProductState>
          </UserState>
        </SellerState>
      </ProgressState>
    </AlertState>
  );
}

export default App;


