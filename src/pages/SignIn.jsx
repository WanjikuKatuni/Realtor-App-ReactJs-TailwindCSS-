import React, { useState } from 'react'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    // destructure email and password
    const {email, password} = formData;
    // update the content on the form
    function onChange(e){
        // console.log(e.target.value)
        setFormData((prevState)=>({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }


  return (
    <section>
        <h1 className='text-3xl text-center mt-6 font-bold'>Sign In</h1>
        <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
            <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
                <img src="https://plus.unsplash.com/premium_photo-1671493286575-5215b2ad5b6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" className='w-full rounded-2xl' alt="sign-in-image" />
            </div>
            <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
                <form >
                    <input  
                    type="email" 
                    id="email" 
                    value={email}
                    onChange={onChange}
                    placeholder="Email Address"
                    className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out '/>
                    <div className='relative mb-6'>
                        <input  
                        type={showPassword ? "text": "password"} 
                        id="password" 
                        value={password}
                        onChange={onChange}
                        placeholder="Password"
                        className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out '/>
                       
                        {showPassword ? <AiFillEyeInvisible className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=> setShowPassword((prevState) =>!prevState)}/> : <AiFillEye className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=> setShowPassword((prevState) =>!prevState)}/>}

                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}
