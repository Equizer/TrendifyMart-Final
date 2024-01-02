import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar';
import ProgressContext from '../context/progress/ProgressContext'
import UserState from '../context/user/UserContext'
import OffCanvas from './OffCanvas';
const Navbar = () => {

    const progressContext = useContext(ProgressContext);
    const { progress, setProgress } = progressContext;
    const userState = useContext(UserState);
    const { user, getUserData } = userState;


    const location = useLocation();
    return (
        <>
            <LoadingBar progress={progress} color={'rgb(16, 121, 205)'} onLoaderFinished={() => { setProgress(0) }} />
            <OffCanvas />
            <nav className="navbar navbar-expand-lg bg-body-tertiary container-fluid" style={{ position: 'fixed', zIndex: 1000 }}>
                <div className="container-fluid">
                    <button className="btn btn-lg btn-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#demo">
                    <i className="fa-solid fa-bars"></i>
                    </button>
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {!localStorage.getItem('token') && <Link className={`btn btn-primary mx-1 ${location.pathname === '/login' ? 'active' : ''}`} aria-current="page" to="/login">Login</Link>}
                            </li>
                            <li className="nav-item">
                                {!localStorage.getItem('token') && <Link className={`btn btn-primary mx-1 ${location.pathname === '/signup' ? 'active' : ''}`} aria-current="page" to="/signup">Signup</Link>}
                            </li>
                        </ul>
                        <Link className="navbar-brand" to="/home">TrendifyMart</Link>

                        <div>
                            <Link to='/profile' className="bg-info rounded-circle profile-link ml-2">
                                <i className="fa-solid fa-user" style={{ color: "#ffffff" }}></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
