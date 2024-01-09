import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Nav from './Components/Nav'
import Home from './home'
import ChatR from './chatR'
import Login from './login'
import SignUp from './signUp'

function App() {
  // const cors = require('cors')
  return (
    <>
      <Nav />

      <div className='w-full'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/ChatR' element={<ChatR />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signUp' element={<SignUp />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
