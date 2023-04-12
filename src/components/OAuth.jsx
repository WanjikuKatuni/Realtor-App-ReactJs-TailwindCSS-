import React from 'react'
import {FcGoogle} from 'react-icons/fc'

export default function OAuth() {
  return (
    <button className=' flex  items-center justify-center w-full bg-red-700 text-white text-sm font-medium uppercase px-7 py-3 rounded shadow-md hover:bg-red-800 transition duration-150 ease-in-out hover:shadow-lg active:bg-red-900 active:shadow-lg'
    type='submit'>
        <FcGoogle className='text-2xl bg-white rounded-full mr-2'/>
        Continue with Google
        </button>
  )
}
