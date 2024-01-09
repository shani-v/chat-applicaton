import React from 'react'
import logo from '../src/Image/clogo.png'
import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const auth = getAuth()
  const [formData, setFormData] = useState({
    password: '',
    email: '',
  })
  const handelSubmit = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user)
        if (user.uid) {
          // console.log('successfully login')
          navigate('/home')
        }
      })
      .catch((error) => {
        // console.log(error)
        if (error) {
          alert('something went wrong')
        }
      })
  }

  return (
    <>
      <section className='bg-gray-50 '>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <a
            href='#'
            className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
          >
            <img className='w-11 h-11 mr-2 rounded-md' src={logo} alt='logo' />
            <p className='text-2xl font-bold text-blue-300'>GoChat</p>
          </a>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-blue-300'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight  md:text-2x text-black  '>
                Login to account
              </h1>
              <form className='space-y-4 md:space-y-6' action='#'>
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Your email
                  </label>
                  <input
                    onChange={(e) => {
                      formData.email = e.target.value
                    }}
                    type='email'
                    name='email'
                    id='email'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='name@company.com'
                    required=''
                  />
                </div>
                <div>
                  <label
                    htmlFor='password'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Password
                  </label>
                  <input
                    onChange={(e) => {
                      formData.password = e.target.value
                    }}
                    type='password'
                    name='password'
                    id='password'
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required=''
                  />
                </div>

                <button
                  onClick={(e) => {
                    handelSubmit(e)
                  }}
                  type='submit'
                  className='w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
