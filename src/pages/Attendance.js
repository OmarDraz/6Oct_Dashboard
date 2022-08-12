import React, {useEffect, useState} from 'react'
import io from 'socket.io-client'
import {motion} from 'framer-motion'
import useSound from 'use-sound';
import notificationSound from '../assets/audio/Notification.mp3'
import Modal from '../components/modal/Modal';
import celebrate from '../assets/celebrate.svg'
import logo from '../assets/imgs/logo2.svg'
import {MdCancel} from 'react-icons/md'
import axiosInstance from '../axios';

const socket = io.connect("http://localhost:3001")

const Attendance = () => {
  const [attendees, setAttendees] = useState([])
  const [selected, setSelected] = useState({
    name: ''
  });
  const [welcomeModal, setWelcomeModal] = useState(false)

  const [notificationSplay] = useSound(notificationSound)
  
useEffect(() => {
  socket.on('recieve_clients', (data) => {
    notificationSplay() 
    setAttendees([...attendees, data])
    console.log(data)
  })
},[ attendees, notificationSplay])

useEffect(() => {
  axiosInstance.get('statistics/day').then(res => setAttendees(res.data))
}, [])
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .3 }} exit={{ opacity: 0 }}>
      <motion.h3 initial={{ x: 30 }} animate={{ x: 0 }} transition={{ duration: .5 }} className='heading'>الحاضرين</motion.h3>
      <motion.div initial={{ x: -30 }} animate={{ x: 0 }} transition={{ duration: .5 }}  className='row'>
        {
          attendees.map((a) => (
          <div style={{ flexDirection: 'column' }} onClick={() => {
            setWelcomeModal(true)
            setSelected({
              name: a.name,
              id: a.id
            })
          }} className='box col-3 col-sm-12'>
            <div>{a.name}</div>
            <div>{a.phone}</div>
            <div style={{ position: 'absolute', left: 10, top: 5, zIndex: 99 }} onClick={(e) => {
              e.stopPropagation();
              axiosInstance.delete(`statistics/${a.id}}`).then(() => {
                setAttendees(attendees.filter(att => att.id !== a.id ))
              })
            }
              }><MdCancel /></div>
          </div>
          ))
        }
      </motion.div>
      <Modal toggle={welcomeModal} setToggle={setWelcomeModal}>
        <div className='flex__center' style={{ flexDirection: 'column' }}>
          <img alt="celebrate" width="200" src={celebrate} />
          <h1>مرحبا <span style={{ color: 'var(--secondary-color)' }}>{selected.name}!</span></h1>
          <h1>في</h1>
          <img alt="logo" src={logo} />
          <br />
          <br />
        </div>
      </Modal>
    </motion.div>
  )
}

export default Attendance