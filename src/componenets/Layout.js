import React from 'react';
import { NavLink, Outlet } from "react-router-dom";
import './Layout.css';
import { useNavigate } from "react-router-dom";

export default function Layout() {
    const navigate = useNavigate(); 

    const handleLogout = () => {
        const keys = Object.keys(sessionStorage);
        sessionStorage.removeItem(keys);
        //sessionStorage.removeItem('id');
        navigate('/login');
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/' activeClassName="active">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/viewCars' activeClassName="active">View Cars</NavLink>
                        </li>
                        

        {sessionStorage.getItem('customerId') ? (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Profile
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><NavLink className="dropdown-item" to='/updateProfile' >Update Profile</NavLink></li>
                    <li><NavLink className="dropdown-item" to='/viewBookings' > View Bookings</NavLink></li>
                    <li><NavLink className="dropdown-item" to='/viewPayments' > View Payments</NavLink></li>
                    <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </ul>
            </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to='/login' activeClassName="active">Sign In</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to='/register' activeClassName="active">Sign Up</NavLink>
                </li>
              </>
            )}
                    </ul>
                </div>
            </nav>

            <div className="container mt-4">
                <Outlet />
            </div>
        </>
    )
}

