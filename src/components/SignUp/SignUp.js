import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css'
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../contexts/UserContext';

const SignUp = () => {
    const [error, setError] = useState('');

    const {createUser, signInWithGoogle} = useContext(AuthContext);

    const handleSubmit = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        createUser(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            form.reset();
        })
        .catch(error =>{
            console.error("Error: ",error);
        })
        

        if(password !== confirm){
            setError('Your password did not match');
            return;
        }
        if(password.length < 6){
            setError('Password must be 6 characters or more.')
            return;
        }
        if(!/(?=.*?[A-Z])/.test(password)){
            setError('Password must be have at least one upper case.')
            return;
        }
        if(!/(?=.*?[a-z])/.test(password)){
            setError('Password must be have at least one lower case.')
            return;
        }
        if(!/(?=.*?[0-9])/.test(password)){
            setError('Password must be have at least one digit.')
            return;
        }
        if(!/(?=.*?[#?!@$%^&*-])/.test(password)){
            setError('Password must be have at least one digit.')
            return;
        }
        setError('');
    }

    const handleGoogle = () =>{
        signInWithGoogle()
        .then(result =>{
            const user = result.user;
            console.log(user);
        })
        .catch(error =>{
            console.error("Error: ",error);
        })
    }

    return (
        <div className='form-container-singup'>
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" placeholder='' required/>
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="" placeholder='' required/>
                </div>
                <div className='form-control'>
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name="confirm" id="" placeholder='' required/>
                </div>
                <p className='text-error'>{error}</p>
                <input className='button-submit' type="submit" value="Login" />
            </form>
            <p className='bottom-title'>Already have an Account? <Link to='/login' className='signup-link'>Login</Link></p>
            <p className='bottom-title'>or</p>
            <div>
                <button onClick={handleGoogle} className='button-submit google'><FcGoogle style={{color: 'red', fontSize: '30px'}}/><span className='google-text'>Continue with Google</span></button>
            </div>
        </div>
    );
};

export default SignUp;