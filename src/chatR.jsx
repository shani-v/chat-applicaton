import React, { useState, useEffect, useRef } from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import {
  getDatabase,
  ref as dbRef,
  push,
  set,
  onChildAdded,
  remove,
} from 'firebase/database'
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage'
import { FcGoogle } from 'react-icons/fc'
import { FiPaperclip, FiFile, FiUser } from 'react-icons/fi'
import { format } from 'date-fns'

// Icons
const BlueTick = () => <span className='text-blue-500 ml-1'>✓✓</span>
const ReplyIcon = () => <span className='text-gray-500 mr-2'>↩️</span>
const DeleteIcon = () => <span className='text-red-500 ml-2'>🗑️</span>

// Input and Button Components
const Input = ({ value, onChange, placeholder, onKeyPress, className }) => (
  <input
    type='text'
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    onKeyPress={onKeyPress}
    className={`border-2 border-purple-300 rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${className}`}
  />
)

const Button = ({ onClick, children, className }) => (
  <button
    onClick={onClick}
    className={`bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-2 px-6 rounded-full hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 ${className}`}
  >
    {children}
  </button>
)

const ChatR = () => {
  const [name, setName] = useState('')
  const [inputName, setInputName] = useState('')
  const [chats, setChats] = useState([])
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')
  const [replyTo, setReplyTo] = useState(null)
  const [fileUpload, setFileUpload] = useState(null)
  const db = getDatabase()
  const storage = getStorage()
  const chatListRef = dbRef(db, 'chats')
  const chatContainerRef = useRef(null)
  const fileInputRef = useRef(null)

  const provider = new GoogleAuthProvider()
  const auth = getAuth()

  // Google login
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      setName(result.user.displayName)
      setError('')
    } catch (error) {
      setError('Failed to login with Google. Please try again.')
    }
  }

  // Start chatting
  const startChatting = () => {
    if (inputName.trim()) {
      setName(inputName.trim())
      setError('')
    } else {
      setError('Please enter a name')
    }
  }

  // Send chat message
  const sendChat = async () => {
    if (!msg.trim() && !fileUpload) {
      setError('Please enter a message or select a file')
      return
    }
    const chatRef = push(chatListRef)
    let fileUrl = ''
    let fileType = ''

    if (fileUpload) {
      const fileRef = storageRef(
        storage,
        `uploads/${Date.now()}_${fileUpload.name}`
      )
      await uploadBytes(fileRef, fileUpload)
      fileUrl = await getDownloadURL(fileRef)
      fileType = fileUpload.type.split('/')[0]
    }

    set(chatRef, {
      name,
      message: msg.trim(),
      timestamp: Date.now(),
      replyTo: replyTo,
      fileUrl,
      fileType,
    })

    setMsg('')
    setError('')
    setReplyTo(null)
    setFileUpload(null)
  }

  // Delete chat message
  const deleteChat = (chatId) => {
    const chatRef = dbRef(db, `chats/${chatId}`)
    remove(chatRef)
    setChats(chats.filter((chat) => chat.id !== chatId))
  }

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      setChats((prevChats) => [...prevChats, { ...data.val(), id: data.key }])
    })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [chats])

  // Handle reply
  const handleReply = (chatId) => {
    setReplyTo(chatId)
  }

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setFileUpload(file)
    }
  }

  const formatTimestamp = (timestamp) => {
    if (!timestamp) {
      return '' // return empty string or some default value if timestamp is invalid
    }

    try {
      return format(new Date(timestamp), 'HH:mm')
    } catch (error) {
      console.error('Invalid timestamp:', timestamp, error)
      return '' // return empty string or some fallback in case of error
    }
  }

  // Render message content
  const renderMessageContent = (chat) => {
    switch (chat.fileType) {
      case 'image':
        return (
          <img
            src={chat.fileUrl}
            alt='Uploaded image'
            className='max-w-full h-auto rounded-lg'
          />
        )
      case 'application':
        return (
          <a
            href={chat.fileUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center text-blue-500 hover:underline'
          >
            <FiFile className='mr-2' /> View Document
          </a>
        )
      case 'text':
        if (chat.fileUrl.endsWith('.vcf')) {
          return (
            <a
              href={chat.fileUrl}
              download
              className='flex items-center text-blue-500 hover:underline'
            >
              <FiUser className='mr-2' /> Download Contact
            </a>
          )
        }
        break
      default:
        return (
          <p className='text-sm sm:text-base break-words'>{chat.message}</p>
        )
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-4'>
      <div className='w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 transition-all duration-300 hover:shadow-3xl'>
        {!name ? (
          <div className='space-y-6 animate-fade-in'>
            <h2 className='text-3xl sm:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600'>
              Welcome to ChatR
            </h2>
            <Input
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder='Enter your name'
              className='w-full text-lg'
            />
            <div className='flex justify-center'>
              <Button
                onClick={googleLogin}
                className='flex items-center space-x-2 w-full sm:w-auto text-lg'
              >
                <FcGoogle size={24} />
                <span>Login with Google</span>
              </Button>
            </div>
            <Button onClick={startChatting} className='w-full text-lg'>
              Start Chatting
            </Button>
          </div>
        ) : (
          <div className='space-y-6 animate-fade-in'>
            <h2 className='text-2xl sm:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600'>
              Welcome, {name}!
            </h2>
            <div
              ref={chatContainerRef}
              className='h-72 sm:h-96 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-purple-100'
            >
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex ${
                    chat.name === name ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] w-auto px-4 py-3 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg ${
                      chat.name === name
                        ? 'bg-gradient-to-r from-purple-100 to-indigo-100 text-gray-800'
                        : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800'
                    }`}
                  >
                    {chat.replyTo && (
                      <div className='text-xs italic mb-2 border-l-2 border-purple-400 pl-2'>
                        Replying to:{' '}
                        {chats.find((c) => c.id === chat.replyTo)?.message}
                      </div>
                    )}
                    <div className='flex justify-between items-start mb-1'>
                      <p className='font-medium text-sm'>{chat.name}</p>
                      <p className='text-xs opacity-70'>
                        {formatTimestamp(chat.timestamp)}
                      </p>
                    </div>
                    {renderMessageContent(chat)}
                    <div className='flex justify-end items-center mt-2'>
                      <button
                        onClick={() => handleReply(chat.id)}
                        className='text-xs flex items-center space-x-1'
                      >
                        <ReplyIcon /> Reply
                      </button>
                      {chat.name === name && (
                        <button
                          onClick={() => deleteChat(chat.id)}
                          className='text-xs flex items-center space-x-1 ml-2'
                        >
                          <DeleteIcon /> Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='flex flex-col space-y-2'>
              {replyTo && (
                <div className='bg-purple-100 p-3 rounded-lg flex justify-between items-center'>
                  <p className='text-sm'>
                    Replying to:{' '}
                    {chats.find((chat) => chat.id === replyTo)?.message}
                  </p>
                  <button
                    onClick={() => setReplyTo(null)}
                    className='text-sm font-medium text-red-500'
                  >
                    Cancel
                  </button>
                </div>
              )}
              <div className='flex items-center space-x-2'>
                <Input
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder='Type your message...'
                  onKeyPress={(e) => e.key === 'Enter' && sendChat()}
                  className='flex-grow text-sm sm:text-base md:text-lg px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-purple-500 transition-all duration-300'
                />
                <input
                  type='file'
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className='hidden'
                />
                <Button
                  onClick={() => fileInputRef.current.click()}
                  className='p-2 flex items-center justify-center'
                >
                  <FiPaperclip size={24} />
                </Button>
                <Button
                  onClick={sendChat}
                  className='whitespace-nowrap text-sm sm:text-base md:text-lg px-4 py-2'
                >
                  Send
                </Button>
              </div>

              {fileUpload && (
                <p className='text-sm text-gray-600'>
                  File selected: {fileUpload.name}
                </p>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg relative mt-6'>
            <span className='block sm:inline'>{error}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatR
