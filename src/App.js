import './App.css';
import About from './Components/About';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Components/home/Home';
import Profile from './Components/profile/Profile';
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
import EditProfile from './Components/shop/EditProduct';
import CartComponent from './Components/cart/CartComponent'
import BookmarkedState from './context/bookmarked/BookmarkedState'
import Saved from './Components/saved/Saved';



function App() {
  return (
    <AlertState>
      <ProgressState>
        <SellerState>
          <UserState>
            <ProductState>
              <CartState>
                <BookmarkedState>
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
                        <Route exact path='/saved' element={<Saved/>} />
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
                </BookmarkedState>
              </CartState>
            </ProductState>
          </UserState>
        </SellerState>
      </ProgressState>
    </AlertState>
  );
}

export default App;


