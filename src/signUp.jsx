import React from 'react'
import logo from '../src/Image/clogo.png'
import { useState } from 'react'
import { Firestore, doc, setDoc } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'

const SignUp = () => {
  const storage = getStorage()
  const db = getFirestore()
  const auth = getAuth()
  const [error, setError] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    file: '',
  })
  const handelSubmit = async (e) => {
    e.preventDefault()

    // try {
    //   const res = await createUserWithEmailAndPassword(
    //     auth,
    //     formData.name,
    //     formData.email,
    //     formData.password,
    //     formData.file
    //   )
    //   console.log(res)
    //   console.log(formData)
    //   const displayName = formData.name
    //   const email = formData.email
    //   const storageRef = ref(storage, displayName)
    //   const uploadTask = uploadBytesResumable(storageRef, formData.file)

    //   uploadTask.on(
    //     (error) => {
    //       setError(true)
    //     },
    //     () => {
    //       getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
    //         await updateProfile(res.user, {
    //           displayName,
    //           photoURL: downloadURL,
    //         })
    //         await setDoc(doc(db, 'user', res.user.uid), {
    //           uid: res.user.uid,
    //           displayName,
    //           email,
    //           photoURL: downloadURL,
    //         })
    //       })
    //     }
    //   )
    // } catch (err) {
    //   console.log(err)
    //   setError(true)
    // }
    // .then((userCredential) => {
    //   console.log(userCredential)
    //   // Signed in
    //   const user = userCredential.user
    //   console.log(user)
    //   // ...
    // })
    // .catch((error) => {
    //   const errorCode = error.code
    //   const errorMessage = error.message
    // })
    console.log('hello')

    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
        // ..
      })
  }
  return (
    <div>
      <section className='bg-gray-50 '>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <a
            href='#'
            className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
          >
            <img className='w-11 h-11 mr-2 rounded-md' src={logo} alt='logo' />
            <p className='text-2xl font-bold text-blue-300'>GoChat</p>
          </a>
          <div className='w-full bg-white rounded-lg shadow border-2 border-blue-300 md:mt-0 sm:max-w-md xl:p-0 '>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Create and account
              </h1>
              <form
                className='space-y-4 md:space-y-6'
                action='#'
                // onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor='name'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Your Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    // value={name}
                    onChange={(e) => {
                      formData.name = e.target.value
                      e.preventDefault()
                    }}
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Entre your name'
                    required=''
                  />
                </div>
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
                      e.preventDefault()
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
                    type='password'
                    name='password'
                    id='password'
                    onChange={(e) => {
                      formData.password = e.target.value
                      e.preventDefault()
                    }}
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required=''
                  />
                </div>
                <div>
                  <label
                    htmlFor='confirm-password'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Uplode Image
                  </label>
                  <input
                    type='file'
                    onChange={(e) => {
                      formData.image = e.target.files[0]
                      e.preventDefault()
                    }}
                    name='confirm-password'
                    placeholder='uploge image'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required=''
                  />
                </div>
                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input
                      id='terms'
                      aria-describedby='terms'
                      type='checkbox'
                      className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                      required=''
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label
                      htmlFor='terms'
                      className='font-light text-gray-500 dark:text-gray-300'
                    >
                      I accept the
                      <a
                        className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                        href='#'
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type='submit'
                  onClick={(e) => {
                    handelSubmit(e)
                  }}
                  className='w-full text-black  bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                >
                  Create an account
                </button>
                {error && <span>something went wrong</span>}
                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  Already have an account?{' '}
                  <a
                    href='/login'
                    className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SignUp
