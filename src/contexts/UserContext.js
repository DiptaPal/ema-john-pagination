import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'
export const AuthContext = createContext();
const provider = new GoogleAuthProvider();

const auth = getAuth(app);
const UserContext = ({children}) => {
    const [user, setUser] = useState({})
    const [loading,setLoading] = useState(true)
    
    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    
    const logOut = () =>{
        setLoading(true)
        return signOut(auth);
    }

    const signInWithGoogle = () =>{
        setLoading(true)
        return signInWithPopup(auth, provider);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    },[])

    const authInfo = {user, loading, createUser, signIn, signInWithGoogle, logOut}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;