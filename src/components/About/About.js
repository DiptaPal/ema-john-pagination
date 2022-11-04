import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/UserContext';

const About = () => {
    const {user} = useContext(AuthContext) 
    return (
        <div>
            <h2 className='text-center'>This is About</h2>
            <p className='text-center'>{user?.email}</p>
        </div>
    );
};

export default About;