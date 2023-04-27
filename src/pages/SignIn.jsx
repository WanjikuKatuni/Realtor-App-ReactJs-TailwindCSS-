import React, { useState } from 'react'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import {Link, useNavigate} from 'react-router-dom';
import OAuth from '../components/OAuth';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import {toast} from 'react-toastify'

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    // destructure email and password
    const {email, password} = formData;
    const navigate = useNavigate();
    // update the content on the form
    function onChange(e){
        // console.log(e.target.value)
        setFormData((prevState)=>({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    async function onSubmit(e){
        e.preventDefault();
        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            if(userCredential.user){
                navigate("/")
            }
        } catch (error) {
            toast.error("Invalid User Credentials")
            
        }
    }


  return (
    <section>
        <h1 className='text-3xl text-center mt-6 font-bold'>Sign In</h1>
        <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
            <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
                <img src="https://images.unsplash.com/photo-1586864387634-2f33030dab41?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bG9jayUyMGFuZCUyMGtleXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" className='w-full rounded-2xl' alt="sign-in-image" />
            </div>
            <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
                <form onClick={onSubmit}>
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

                    <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
                        <p className='mb-6'>Don't have an account? 
                            <Link to="/sign-up" className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out ml-1'> Register</Link>
                        </p>
                        <p>
                            <Link to="/forgot-password" className='text-red-600 hover:text-red-800 transition duration-200 ease-in-out'> Forgot password?</Link>
                        </p>
                    </div>

                    <button className='w-full bg-blue-600 text-white text-sm font-medium uppercase px-7 py-3 rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'
                    type='submit'>Sign in</button>

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
