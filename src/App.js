import './App.css';
import About from './Components/About';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Components/home/Home';
import Cart from './Components/cart/Cart';
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



function App() {

  return (
    <AlertState>
      <ProgressState>
        <UserState>
          <ProductState >
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
                    <Route exact path='/cart' element={<Cart />} />
                    <Route exact path='/profile' element={<Profile />} />
                    <Route exact path='/signup' element={<Signup />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/myshop' element={<Shop />} />
                  </Routes>
                </div>
              </div>
            </Router>
          </ProductState>
        </UserState>
      </ProgressState>
    </AlertState>
  );
}

export default App;


