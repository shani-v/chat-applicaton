import React from 'react'
import logo from '../Image/clogo.png'
const Nav = () => {
  return (
    <div>
      <div className=' bg-green-400 w-full h-15 p-2'>
        <div className='flex justify-between mx-5 '>
          <div className='flex'>
            <img className='w-11 h-11 mr-2 rounded-lg' src={logo} alt='logo' />
            <a href='/' className='font-bold text-2xl text-white mt-2'>
              GoChat
            </a>
          </div>
          <div className=''>
            <ul className='flex gap-5'>
              <li className='font-bold text-base text-white mt-2 mr-4 '>
                <a href='/ChatR'>ChatRoom</a>
              </li>
              <li className='font-bold text-base text-white mt-2 mr-4 '>
                <a href='/login'>Login</a>
              </li>
              <li className='font-bold text-base text-white mt-2 mr-4 '>
                <a
                  href='signUp'
                  className='bg-blue-500 rounded-md p-2 hover:text-yellow-400'
                >
                  SingUp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav
