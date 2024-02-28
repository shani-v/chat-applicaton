import React, { useEffect } from 'react'
import { useState } from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

import { getDatabase, ref, push, set, onChildAdded } from 'firebase/database'

const ChatR = () => {
  const [name, setName] = useState('')
  const [chats, setChats] = useState([])
  const [msg, setMsg] = useState('')
  const db = getDatabase()
  const chatListRef = ref(db, 'chats')

  const provider = new GoogleAuthProvider()
  const auth = getAuth()
  const googleLogin = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
        setName(result.user.displayName)
        // console.log(token, user)
        // console.log(user)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
      })
  }

  // const updateHeight = () => {
  //   window.scrollTo(0, document.body.scrollHeight)
  // }

  // const b = () => {}

  const sendChat = () => {
    const db = getDatabase()
    console.log(db)
    const chatRef = push(chatListRef)
    set(chatRef, {
      name,
      massage: msg,
    })
    setMsg('')
  }

  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      // console.log(data.val())
      setChats((chats) => [...chats, data.val()])

      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight)
      }, 100)
    })
  }, [])

  return (
    <div>
      {!name.length && (
        <div>
          <input
            type='text'
            placeholder='enter name to start '
            onBlur={(e) => setName(e.target.value)}
          />
          <button onClick={googleLogin}>Login with Google</button>
        </div>
      )}
      {name && (
        <div className='mb-16'>
          <h1 className='font-semibold text-xl mb-2'>User:-{name}</h1>
          {chats.map((c, i) => (
            <div
              id='chat'
              key={i}
              className={c.name === name ? 'flex  flex-row-reverse' : 'flex'}
            >
              <p
                className={
                  c.name === name
                    ? 'border-2 border-gray-400 rounded-md bg-orange-200 p-4 m-2'
                    : 'border-2 border-gray-400 rounded-md bg-emerald-300 p-4 m-2'
                }
              >
                <strong>{c.name}:</strong>
                <span>{c.massage}</span>
              </p>
            </div>
          ))}
          <div className='flex flex-row fixed w-full bottom-0  '>
            <input
              type='text'
              placeholder='Enter your massage '
              className='flex  flex-grow border-2 border-black p-2'
              onInput={(e) => setMsg(e.target.value)}
              value={msg}
            />
            <button
              className='bg-green-300 text-white  font-semibold p-2'
              onClick={(e) => {
                sendChat()
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
export default ChatR
