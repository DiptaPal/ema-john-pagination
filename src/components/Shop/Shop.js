import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb'
import './Shop.css';
import { json, Link, useLoaderData } from 'react-router-dom';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Shop = () => {
    // const { products, count } = useLoaderData();
    const [cart, setCart] = useState([]);

    //pagination
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const [products, setProducts] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        const url = `http://localhost:5000/products?page=${page}&&size=${size}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCount(data.count)
                setProducts(data.products)
            })
    }, [page, size])

    const pages = Math.ceil(count / size);

    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];

        const ids = Object.keys(storedCart)
        console.log(ids);
        fetch('http://localhost:5000/productsByIds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(data => {
                for (const id in storedCart) {
                    const addedProduct = data.find(product => product._id === id)
                    if (addedProduct) {
                        const quantity = storedCart[id];
                        addedProduct.quantity = quantity;
                        savedCart.push(addedProduct);
                    }
                }
                setCart(savedCart);

            })

    }, [products])

    const handleAddToCart = (selectedProduct) => {
        // cart.push(product);
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct.product);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct]
        }
        else {
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        setCart(newCart)
        addToDb(selectedProduct._id)
    }
    const handleClearCart = (id) => {
        const cart = []
        setCart(cart)
        deleteShoppingCart(id);
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        product={product}
                        handleAddToCart={handleAddToCart}
                        key={product._id}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart} handleClearCart={handleClearCart}>
                    <Link className='review-btn' to='/orders'>
                        <button className='review-order-btn'>Review Order <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></button>
                    </Link>
                </Cart>
            </div>
            <div>
                <p className='pageNumber'>Currently Selected Page: {page} and size: {size}</p>
                <div className="pagination">
                    {
                        [...Array(pages).keys()].map(number => <button
                            key={number}
                            className={page === number && 'selected'}
                            onClick={() => setPage(number)}
                        >{number + 1}</button>)
                    }
                </div>
                <div className='data_view'>
                    <select onChange={event => setSize(event.target.value)}>
                        <option defaultValue='5'>5</option>
                        <option defaultValue='10' selected>10</option>
                        <option defaultValue='15'>15</option>
                        <option defaultValue='20'>20</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Shop;