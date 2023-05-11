import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth';

export default function ForgotPassword() {

    const [email, setEmail] = useState("")

    // update the content on the form
    function onChange(e){
        // console.log(e.target.value)
        setEmail(e.target.value);
    }

    async function onSubmit(e){
        e.preventDefault()
        
        try {
            const auth = getAuth()
            await sendPasswordResetEmail(auth, email)
            toast.success("Email was sent")
            
        } catch (error) {
            toast.error("Could not send reset password")
        }
    }

  return (
    <section>
        <h1 className='text-3xl text-center mt-6 font-bold'>Forgot Password</h1>
        <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
            <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
                <img src="https://images.unsplash.com/photo-1634224143538-ce0221abf732?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGZvcmdvdCUyMHBhc3N3b3JkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" className='w-full rounded-2xl' alt="" />
            </div>
            <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
                <form onSubmit={onSubmit}>

                 <input  
                    type="email" 
                    id="email" 
                    value={email}
                    onChange={onChange}
                    placeholder="Email Address"
                    className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out '/>
                   
                   
                    <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
                        <p className='mb-6'>Don't have an account? 
                            <Link to="/sign-up" className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out ml-1'> Sign In</Link>
                        </p>
                        <p>
                            <Link to="/sign-in" className='text-red-600 hover:text-red-800 transition duration-200 ease-in-out'> Sign in instead? </Link>
                        </p>
                    </div>

                    <button className='w-full bg-blue-600 text-white text-sm font-medium uppercase px-7 py-3 rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'
                    type='submit'>Send Reset Password</button>

                    <div className='flex items-center my-4 before:border-t  before:flex-1  before:border-gray-300 after:border-t  after:flex-1  after:border-gray-300'>
                        <p className='text-center font-semibold mx-4'>OR</p>
                    </div>

                    <OAuth/>
                </form>
            </div>
        </div>
    </section>
  )
}
