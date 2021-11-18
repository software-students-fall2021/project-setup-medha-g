import React from 'react';
import { Link } from 'react-router-dom';
import LogoutPage from './LogOutPage';

const Header = () => {
    return (
        <div className="navbar">
            <Link className="column" to="/landing">
            <img alt="Qries" src="../favicon.ico" width="15%"></img></Link>
            <Link className="column login-text" to="/sub_list">Log In/Sign Up</Link>
            <LogoutPage />
        </div>
    )
}

export default Header;