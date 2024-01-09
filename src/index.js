import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDnS9GnqSaoTDywp6s1IRO2dbciKCdODYE',
  authDomain: 'react-chat-app-df5d7.firebaseapp.com',
  databaseURL: 'https://react-chat-app-df5d7-default-rtdb.firebaseio.com',
  projectId: 'react-chat-app-df5d7',
  storageBucket: 'react-chat-app-df5d7.appspot.com',
  messagingSenderId: '768071448705',
  appId: '1:768071448705:web:61da8fa8b4465dc5417580',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
