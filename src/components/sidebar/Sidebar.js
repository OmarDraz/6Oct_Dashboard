import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './sidebar.css'
import {NavLink} from 'react-router-dom'
import {FaHome} from 'react-icons/fa'
import {IoIosCafe} from 'react-icons/io'
import {HiUsers} from 'react-icons/hi'
import {BsDoorOpenFill} from 'react-icons/bs'
import logo from '../../assets/imgs/logo.svg'
import {useNavigate} from 'react-router-dom'
import {MdOutlineArrowForwardIos, MdEventSeat, MdBackHand} from 'react-icons/md'
const routes = [
  { 
    path: '/',
    name: 'الرئيسية',
    icon: <FaHome />
  },
  {
    path: '/menu',
    name: 'القائمة',
    icon: <IoIosCafe />
  },
  {
    path: '/users',
    name: 'المستخدمين',
    icon: <HiUsers />
  },
  {
    path: '/attendance',
    name: 'الحاضرين',
    icon: <MdEventSeat />
  },
  {
    path: '/welcome_media',
    name: 'الترحيب',
    icon: <MdBackHand />
  }
]

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)

  const navigate = useNavigate()
  return (
    <div className="main-container">
        <motion.div transition={{ duration: 0.8 }} animate={{ width: isOpen ? 300 : 45}} className="sidebar">
          <motion.div transition={{ duration: 0.8 }} animate={{ x: isOpen ? 0 : 200 }} className="logo">
            <img alt="logo" src={logo} />
          </motion.div>
          <motion.section transition={{ duration: 0.8 }} animate={{ y: isOpen ? 0 : -143 }} className="routes">
            {
              routes.map((route) => (
                <NavLink to={route.path} key={route.name} className="nav_link">
                  <span>{route.icon}</span>
                    <motion.div transition={{ duration: 0.8 }} animate={{ opacity: isOpen ? 1 : 0 }} className="link_text">{route.name}</motion.div>
                </NavLink>
              ))
            }
          </motion.section>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="nav_link" onClick={() => navigate('/logout')} style={{  marginTop: 'auto', cursor: 'pointer' }}>
              <span><BsDoorOpenFill /></span>
              <motion.div transition={{ duration: 0.8 }} animate={{ x: isOpen ? 0 : +300 }} className="link_text">تسجيل خروج</motion.div>
            </div>
        </motion.div>
        <motion.div className='rotateIcon' transition={{ duration: 0.8 }} animate={{ rotate: isOpen ? 0 : 180, marginRight: isOpen ? 330 :85 }}>
        <MdOutlineArrowForwardIos style={{ color: 'var(--secondary-color)', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)} />
        </motion.div>
    </div>
  )
}

export default Sidebar