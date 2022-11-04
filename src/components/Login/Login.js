import React, { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import './Login.css'

const Login = () => {
    const {signIn, signInWithGoogle} = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleSubmit = event =>{
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            form.reset();
            navigate(from, { replace: true });

        })
        .catch(error =>{
            setError("Password does not match")
            console.error("Error: ",error);
        })
    }

    const handleGoogle = () =>{
        signInWithGoogle()
        .then(result =>{
            const user = result.user;
            console.log(user);
            navigate(from, { replace: true });
        })
        .catch(error =>{
            console.error("Error: ",error);
        })
    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" placeholder='' required/>
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="" placeholder='' required/>
                </div>
                <p className='text-error'>{error}</p>
                <input className='button-submit' type="submit" value="Login" />
            </form>
            <p className='bottom-title'>New to ema john <Link to='/signup' className='signup-link'>Create a new Account</Link></p>
            <p className='bottom-title'>or</p>
            <div>
                <button onClick={handleGoogle} className='button-submit google'><FcGoogle style={{color: 'red', fontSize: '30px'}}/><span className='google-text'>Continue with Google</span></button>
            </div>
        </div>
    );
};

export default Login;