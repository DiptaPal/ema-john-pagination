import React from 'react';
import { Link } from 'react-router-dom';
import user from '../../images/user.png';
import './Home.css'

const Home = () => {
    return (
        <div className='container'>
            <div className='right-side'>
                <p className='title'><small className='offer'>Sale up to 70% off</small></p>
                <div>
                    <p className='heading'>New Collection For Fall</p>
                    <p className='title'>Discover all the new arrivals of ready-to-wear collection.</p>
                </div>
                <Link to='/shop'><button className='btn'>SHOP NOW</button></Link>
            </div>
            <div>
                <img src={user} alt="" />
            </div>
        </div>
    );
};

export default Home;