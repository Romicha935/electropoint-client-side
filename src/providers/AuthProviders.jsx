import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import app from '../Components/firebase/firebase.config'

export const AuthContext = createContext(null)
const auth = getAuth(app)
const AuthProviders = ({children}) => {
    const [user,setUser] = useState(null)
    const[isLoading,setIsLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()

    // useEffect(()=> {
 
    
    //   .then(res=> {
    //     if(res.ok)
    //       return res.json()
    //     else throw new Error('unauthorize');
    //   })
    //   .then(data=> {
    //     setUser(data.user)
    //     setIsLoading(false)
    //   })
    //   .catch(()=> {
    //     setUser(null)
    //     setIsLoading(false)
    //   })
      
    // },[])

    // const logOut = ()=> {
    //   setIsLoading(true)
    //   fetch('https://electropoint-server-side.vercel.app/logout', {
    //     method: 'POST',
    //     credentials:'include'
    //   })
    //   .then(()=> {
    //     setUser(null)
    //     setIsLoading(false)
    //   })
    //   .catch((err)=> {
    //       console.log('logout faild',err);
    //        setIsLoading(false)
    //   })
    // }

    const createUser = (email,password) => {
      setIsLoading(true)
      return createUserWithEmailAndPassword(auth,email,password)
    }
    const signIn = (email,password) => {
      setIsLoading(true)
      return signInWithEmailAndPassword(auth,email,password)
    }

    const googleSignIn = () => {
      setIsLoading(true)
      return signInWithPopup(auth,googleProvider)
    }
    // const logOut = () => {

    //   setIsLoading(false)
    //   return signOut(auth)
    // }

    const logOut = () => {
      setIsLoading(true);
    
      signOut(auth) // firebase theke logout
        .then(() => {
          return fetch('https://electropoint-server-side.vercel.app/logout', {
            method: 'POST',
            credentials: 'include',
          });
        })
        .then(() => {
          setUser(null);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Logout failed:', err);
          setIsLoading(false);
        });
    };
    

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          // JWT token check
          fetch('https://electropoint-server-side.vercel.app/verify-token', {
            credentials: 'include',
          })
            .then((res) => {
              if (res.ok) return res.json();
              else throw new Error('unauthorized');
            })
            .then((data) => {
              setUser(data.user); // decoded user from token
              setIsLoading(false);
            })
            .catch(() => {
              setUser(null);
              setIsLoading(false);
            });
        } else {
          setUser(null);
          setIsLoading(false);
        }
      });
    
      return () => unsubscribe();
    }, []);
    

    const authInfo = {
       user,
       isLoading,
       createUser,
       signIn,
       googleSignIn,
       logOut
    }
  return (

<AuthContext.Provider value={authInfo}>
    {children}
  </AuthContext.Provider>
  )
}

export default AuthProviders