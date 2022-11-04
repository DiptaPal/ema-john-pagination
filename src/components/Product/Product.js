import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import './Product.css'

const Product = ({handleAddToCart, product}) => {
    const {img, name ,price, seller, ratings} = product;
    return (
        <div className='product'>
            <img src={img} alt="Img Not Fount" />
            <div className='product-info'>
                <div className='product-top'>
                    <p className='product-name'>{name}</p>
                    <p className='product-price'>Price: ${price}</p>
                </div>
                <div>
                    <p><small>Manufacturer: {seller}</small></p>
                    <p><small>Rating: {ratings} stars</small></p>
                </div>
            </div>
            <button onClick={() => handleAddToCart(product)} className='cart-btn'>
                <p>Add to Cart</p>
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
            </button>
        </div>
    );
};

export default Product;