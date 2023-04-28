import { onAuthStateChanged, getAuth} from 'firebase/auth'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export function useAuthStatus() {
    // check if logged in
    const [loggedIn, setLoggedIn] = useState(false)
    // check status of information to add loading effect
    const [checkingStatus, setCheckingStatus] = useState(true)

    // ask firebase whether person is authenticated
    useEffect(()=>{
        const auth = getAuth()
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setLoggedIn(true)
            }
            setCheckingStatus(false)
        } )
    }, [])
  return {loggedIn, checkingStatus}
}
