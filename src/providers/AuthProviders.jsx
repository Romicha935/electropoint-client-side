import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import app from '../Components/firebase/firebase.config'

export const AuthContext = createContext(null)
const auth = getAuth(app)
const AuthProviders = ({children}) => {
    const [user,setUser] = useState(null)
    const[isLoading,setIsLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()

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
    const logOut = () => {
      setIsLoading(false)
      return signOut(auth)
    }

    useEffect(()=> {
      const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser)
        setIsLoading(false)
      })
      return ()=> unsubscribe() 
    },[])

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