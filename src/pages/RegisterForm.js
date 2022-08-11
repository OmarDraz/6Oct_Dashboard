import React, {useEffect, useState} from 'react'
import { motion } from 'framer-motion'
import logo from '../assets/imgs/logo.svg'
import Button from '../components/button/Button'
import io from 'socket.io-client'


const RegisterForm = () => {
    const [client, setClient] = useState({
        name: '',
        phone: ''
    })

    const [messages, setMessages] = useState([])

    const socket = io.connect('http://localhost:3001')

    const handleChange = (e) => {
        const {name, value} = e.target
        setClient({...client, [name]: value})
    }

    useEffect(() => {
        socket.on('message', ({name, phone}) => {
            setMessages([...messages, {name, phone}])
        })
    },[])

    const onSubmit = (e) => {
        e.preventDefault();
        socket.emit('client', client)
    }
  return (
    <div className="flex__center" style={{ height: '100vh', backgroundColor: 'rgb(170 152 111 / 50%)'}}>
        <motion.form onSubmit={onSubmit} className="form-box flex__center flex__column" style={{ flexDirection: 'column' }}>
            <motion.div transition={{ duration: 0.8 }} initial={{ y: -10 }} animate={{ y: 0 }}>
                <img alt="logo" src={logo} />
            </motion.div>
            <motion.h3>تسجيل وصول العميل</motion.h3>
            <div className="form-group">
                <label for="name">اسم العميل</label> &nbsp;
                <input required type="text" value={client.name} name="name" onChange={handleChange}  id="name" />
            </div>
            <div className="form-group">
                <label for="name">هاتف العميل</label> &nbsp;
                <input required type="text" value={client.phone} name='phone' onChange={handleChange}  id="phone" />
            </div>
            <div className="form-group">
                <input required type="checkbox" name='policy' onChange={handleChange}  id="name" /> &nbsp;
                <label for="name">الموافقة على <a href="#" style={{ textDecoration: 'underline' }}>سياسة المكان</a></label> &nbsp;
            </div>
            <div style={{ marginTop: 'auto' }}>
                <Button text="سجل دخول العميل" type="submit" />
            </div>
        </motion.form>
        {
            messages.map((msg) => {
                <p>{msg.name}</p>
            })
        }
    </div>
  )
}

export default RegisterForm