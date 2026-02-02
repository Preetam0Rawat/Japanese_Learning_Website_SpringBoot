import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signin } from '../api'
import signinBG from '../images/signBG.jpg'
import { FcUndo } from "react-icons/fc";


const Signin = () => {

  const [formData, setFormData] = useState({
    username: "",                                      //username = email
    password: ""
  })

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSignin = async (e) => {
    e.preventDefault()
    try {
      const response = await signin(formData)
      console.log("Signin successful", response.data)
      localStorage.setItem("token", response.data.token)
      navigate('/')
    } catch (error) {
      alert(error.response?.data?.mssg || "Signin failed")
      setFormData({ email: '', password: '' })
    }
  }

  const handleSignout = async (e) => {
    localStorage.removeItem('token')
    navigate('/signin')
  }

  const token = localStorage.getItem('token')


  return (
    <div className="relative w-full h-dvh overflow-hidden flex  justify-center items-center">
      <img src={signinBG} alt="background" className="absolute -z-10 inset-0 w-full h-full object-cover blur-sm" />
      <div className="relative w-[75vw] h-160 rounded-[90px] sm:w-[75vw] sm:h-170 sm:rounded-[50px] md:w-[50vw]   ">
        <div className="absolute flex flex-col items-center inset-2 border-4 border-green-500  rounded-[90px]  px-10 py-8  sm:rounded-[120px] sm:px-20 sm:py-10 ">


          <h1 className='text-[40px] font-bold text-center'>SIGN IN</h1>
          <div className="flex flex-col items-center md:w-[40vw] w-[80vw] justify-evenly h-[70%]  mt-7">

            <input
              type="email"
              id="username"
              name="username"          
              placeholder="Email"
              value={formData.username}
              onChange={handleInputChange}
              className="w-4/5 border border-gray-400 rounded-md px-4 py-3"
              required
            />

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-4/5 border border-gray-400 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black backdrop-blur-lg"
              required
            />



            <Link
              to="/signup"
              className="mt-2 text-black font-semibold underline hover:text-gray-700"
            >
              New User? Sign Up
            </Link>

            <button
              type="submit"
              onClick={handleSignin}
              className="w-2/5 mt-8 py-3 bg-black text-white text-lg font-semibold rounded-xl hover:bg-gray-800 transition"
            >
              SUBMIT
            </button>

          </div>
          {token ? (<div className='flex justify-end items-center text-center  bg-yellow-300 mt-20 border-2 px-2 rounded-3xl w-[50vw] sm:w-[50vw] md:w-[30vw] '>
            <div className='flex-2 font-semibold text-xl'>You are already signed in</div>
            <div className='flex-1'>
              <button
                type="submit"
                onClick={handleSignout}
                className="w-full my-3 bg-white text-black text-lg font-semibold rounded-full border-2 hover:bg-green-400 transition"
              >
                SIGN OUT
              </button>
            </div>
          </div>
          ) : (
            <></>)}
        </div>


      </div>
      <div className="absolute left-0 top-0 hidden sm:block">
        <Link to="/home">
          <FcUndo size={100} className=" transition-transform duration-200 hover:scale-120" />
        </Link>
      </div>
    </div>
  )
}

export default Signin
