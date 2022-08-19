import React from 'react'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import celebrate from '../assets/celebrate.svg'
import logo from '../assets/imgs/logo2.svg'
import axiosInstance from '../axios'
import ReactPlayer from 'react-player'
import {motion} from 'framer-motion'

const socket = io.connect(`${process.env.REACT_APP_HOST_API}`)

const Welcome = () => {
  const [name, setName] = useState();
  const [media, setMedia] = useState({
    image: '',
    video: ''
  })
  useEffect(() => {
    socket.on('recieve_client', (name) => {
        console.log(name)
        setName(name)
    })
  }, [])

  useEffect(() => {
    document.title = "6ctober | Welcome"
    axiosInstance.get('media/').then((res) => {
      setMedia({
        image: res.data.image,
        video: encodeURI(res.data.video)
      })
    })
  },[])
  return (
    <div className="flex__evently" style={{ height: '100vh', borderRadius: 16 }}>
      <img alt="welcome" style={{ borderRadius: 16, boxShadow: 'var(--box-shadow-panels)' }} src={media.image} width="400" />
      <motion.div initial={{ y: -500 }} animate={{ y: 0 }} className='flex__center' style={{ flexDirection: 'column' }}>
          <motion.img animate={{ rotate: [45, -90, 45] }} transition={{ repeat: Infinity }} alt="celebrate" width="200" src={celebrate} />
          <h1>مرحبا <span style={{ color: 'var(--secondary-color)' }}>{name}!</span></h1>
          <h1>في</h1>
          <img alt="logo" src={logo} />
          <br />
          <br />
      </motion.div>
      <div style={{ borderRadius: 16, boxShadow: 'var(--box-shadow-panels)' }}>
        <ReactPlayer width={450} muted loop={true} playing url={media.video} />
      </div>
    </div>
  )
}

export default Welcome