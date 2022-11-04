import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import logo from '../../images/Logo.svg';
import './Header.css'

const Header = () => {
   
    const {user, logOut} = useContext(AuthContext) 

    const handleSignOut = () =>{
        logOut()
        .then(() =>{

        })
        .catch(error => {
            console.log("Error: ", error);
        })
    }

    return (
        <div>
            <nav className='header'>
                <img src={logo} alt="" />
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/shop">Shop</Link>
                    <Link to="./orders">Orders</Link>
                    <Link to="./inventory">Inventory</Link>
                    <Link to="./about">About</Link>
                    {
                        user?.uid ? 
                        <button onClick={handleSignOut} className='sign-out'>Sign out</button>
                        :
                        <>
                            <Link to="./signup">Sign Up</Link>
                            <Link to="./login">Login</Link>
                        </>
                    }
                    <span>{user?.email}</span>
                </div>
            </nav>
        </div>
    );
};

export default Header;