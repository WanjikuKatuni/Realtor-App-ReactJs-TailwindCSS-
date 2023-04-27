import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { toast } from 'react-toastify'
import { db } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import {useNavigate} from "react-router-dom"



export default function OAuth() {

  const navigate = useNavigate();
async function onGoogleClick(){
  try {
    const auth = getAuth()
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider)
    const user = result.user 
    // console.log(user)

    // check for the user
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if(!docSnap.exists()){
      await setDoc(docRef, {
        name: user.displayName,
        email: user.email,
        timestamp: serverTimestamp()
      });
    };

    navigate("/")
  } catch (error) {
    toast.error("Could not authorize with google")
    // console.log(error);
  }


}
  return (
    <button
    type="button"
    onClick={onGoogleClick} 
    className=' flex  items-center justify-center w-full bg-red-700 text-white text-sm font-medium uppercase px-7 py-3 rounded shadow-md hover:bg-red-800 transition duration-150 ease-in-out hover:shadow-lg active:bg-red-900 active:shadow-lg'
    >
        <FcGoogle className='text-2xl bg-white rounded-full mr-2'/>
        Continue with Google
    </button>
  )
}
