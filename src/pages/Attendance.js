import React, {useEffect, useState} from 'react'
import io from 'socket.io-client'
import {motion} from 'framer-motion'
import useSound from 'use-sound';
import notificationSound from '../assets/audio/Notification.mp3'
import Modal from '../components/modal/Modal';
import {MdCancel} from 'react-icons/md'
import axiosInstance from '../axios';

const socket = io.connect(`${process.env.REACT_APP_HOST_API}`)

const Attendance = () => {
  const [attendees, setAttendees] = useState([])
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
          attendees.length > 0 ?
          attendees.map((a) => (
          <div style={{ flexDirection: 'column' }} onClick={() => {
            setWelcomeModal(true)
            socket.emit('welcome', a.name)

          }} className='box col-3 col-sm-12'>
            <div>{a.name}</div>
            <div>{a.phone}</div>
            <div>الاشخاص : {a.persons}</div>
            <div style={{ position: 'absolute', left: 10, top: 5, zIndex: 99 }} onClick={(e) => {
              e.stopPropagation();
              axiosInstance.delete(`statistics/${a.id}}`).then(() => {
                setAttendees(attendees.filter(att => att.id !== a.id ))
              })
            }
              }><MdCancel /></div>
          </div>
          ))
          :
          <motion.div transition={{ delay: 0.8 }} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ width: '100%', height: '70vh' }} className="flex__center">
          <p>لا يوجد حضور اليوم حتى الان</p>
      </motion.div>
        }
      </motion.div>
      <Modal toggle={welcomeModal} setToggle={setWelcomeModal}>

      </Modal>
    </motion.div>
  )
}

export default Attendance