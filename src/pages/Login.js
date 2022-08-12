import React, {useEffect, useState} from 'react'
import {motion} from 'framer-motion'
import axiosInstance from '../axios'
import logo from '../assets/imgs/logo.svg'
import Button from '../components/button/Button'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
export const Login = () => {
    let navigate = useNavigate()
    const [login, setLogin] = useState({
        phone: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setLogin({...login, [name]: value})
    }

    const [validation, setValidation] = useState('')
    const onSubmit = (e) => {
        e.preventDefault();
        axiosInstance.post('users/login', login).then((res) => {
            if(res.data.status){
                Cookies.set("name", `${res.data.data.first_name} ${res.data.last_name}`);
                Cookies.set("role", res.data.data.role);
                navigate('/')
            } else {
                setValidation(res.data.message)
            }
        })
    }

    useEffect(() => {
        if(Cookies.get('name')){
            navigate('/')
        } else if (Cookies.get('name') && Cookies.get('role') === 'res'){
            navigate('/register')
        }  else if (Cookies.get('name') && Cookies.get('role') === 'waiter'){
            navigate('/attendance')
        }
    }, [navigate])
  return (
    <div className="flex__center" style={{ height: '100vh', backgroundColor: 'rgb(170 152 111 / 50%)'}}>
        <motion.form onSubmit={onSubmit} className="form-box flex__center flex__column" style={{ flexDirection: 'column' }}>
            <motion.div transition={{ duration: 0.8 }} initial={{ y: -10 }} animate={{ y: 0 }}>
                <img alt="logo" src={logo} />
            </motion.div>
            <motion.h3>تسجيل الدخول</motion.h3>
            {
                validation && (
                    <motion.h4 style={{ color: 'red' }} initial={{ y: -10 }} animate={{ y: 0 }}>{validation}</motion.h4>
                )
            }
            <div className="form-group">
                <label for="name">رقم الهاتف</label> &nbsp;
                <input required type="text" value={login.phone} name="phone" onChange={handleChange}  id="phone" />
            </div>
            <div className="form-group">
                <label for="name">كلمة السر</label> &nbsp;
                <input required type="password" value={login.password} name='password' onChange={handleChange}  id="password" />
            </div>
            <div style={{ marginTop: '10px' }}>
                <Button text="تسجيل الدخول" type="submit" />
            </div>
        </motion.form>
    </div>
  )
}
