import React from 'react'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import celebrate from '../assets/celebrate.svg'
import logo from '../assets/imgs/logo2.svg'

const socket = io.connect('http://localhost:3001')

const Welcome = () => {
  const [name, setName] = useState();
  useEffect(() => {
    socket.on('recieve_client', (name) => {
        console.log(name)
        setName(name)
    })
  }, [])
  return (
    <div className='flex__center' style={{ flexDirection: 'column' }}>
        <img alt="celebrate" width="200" src={celebrate} />
        <h1>مرحبا <span style={{ color: 'var(--secondary-color)' }}>{name}!</span></h1>
        <h1>في</h1>
        <img alt="logo" src={logo} />
        <br />
        <br />
    </div>
  )
}

export default Welcome