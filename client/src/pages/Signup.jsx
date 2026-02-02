import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import signupBG from '../images/signBG.jpg'
import { signup } from '../api'
import { FcUndo } from "react-icons/fc";

const Signup = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: "",
    password: "",
    confirmPassword: ""
  })

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState, [name]: value
    }))
  }


  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(formData)
      console.log("Singnup successful", response.data)
      navigate('/signin')
    } catch (error) {
      //console.log("Signup failed: ", error)
      alert(error.response?.data?.message || "Signup failed")
      setFormData({ name: '', email: '', password: '', confirmPassword: '' })
    }

  }
  return (

    // <div className="relative bg-slate-600 w-full h-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${signupBG})` }}>
    //   <div className="absolute backdrop-blur-sm w-200 h-100 rounded-4xl p-5"> 
    //       hello
    //  </div>
    // </div>

    <div className="relative w-full h-dvh overflow-hidden flex  justify-center items-center">
      <img src={signupBG} alt="background" className="absolute -z-10 inset-0 w-full h-full object-cover blur-sm" />
      <div className="relative w-[75vw] h-160 rounded-[90px] sm:w-[75vw] sm:h-170 sm:rounded-[50px] md:w-[50vw]   ">

        <div className="absolute flex flex-col items-center inset-2 border-4 border-green-500  rounded-[90px]  px-10 py-8  sm:rounded-[120px] sm:px-20 sm:py-10 ">


          <h1 className='text-[40px] font-bold text-center'>SIGN UP</h1>
          <div className="flex flex-col items-center md:w-[45vw] w-[80vw] justify-evenly h-[70%] gap-3 mt-7">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-4/5 border border-gray-400 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black   backdrop-blur-lg"
              required
            />

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-4/5 border border-gray-400 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black backdrop-blur-lg"
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

            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-4/5 border border-gray-400 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black backdrop-blur-lg"
              required
            />

            <Link
              to="/signin"
              className="mt-2 text-black font-semibold underline hover:text-gray-700"
            >
              Already a user? Sign In
            </Link>

            <button
              type="button"
              onClick={handleSignup}
              className="w-2/5 mt-8 py-3 bg-black text-white text-lg font-semibold rounded-xl hover:bg-gray-800 transition"
            >
              SUBMIT
            </button>
          </div>

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

export default Signup;
