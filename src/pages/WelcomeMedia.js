import React, {useState} from 'react'
import { motion } from 'framer-motion'
import Button from '../components/button/Button'
import axios from 'axios'
const WelcomeMedia = () => {
  const [media, setMedia] = useState({
    image: '',
    video: ''
  })
  const handleImage = (e) => {
    setMedia({...media, [e.target.name]: e.target.files[0]})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let formData = new FormData();
        formData.append('ar_name', media.ar_name)
        formData.append('en_name', media.en_name)
        formData.append('image', media.image)

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const URL = 'http://localhost:3001/api/categories/add_media'
        axios.post(URL, formData, config).then((res) => {
            alert(res.data.message)
            setMedia({
                ar_name: '',
                en_name: '',
                image: ''
            })
        })
  }
  return (
    <div>
      <motion.h3 initial={{ x: 30 }} animate={{ x: 0 }} transition={{ duration: .5 }} className='heading'>أضف صنف جديد</motion.h3>
      <motion.form initial={{ x: -30 }} animate={{ x: 0 }} transition={{ duration: .5 }} onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="form-group">
                <label for="name">صورة </label> &nbsp;
                <input type="file" name="image" onChange={handleImage} id="name" />
            </div>
            <div className="form-group">
                <label for="name">فيديو</label> &nbsp;
                <input type="file" name="video" onChange={handleImage} id="name" />
            </div>
            <div style={{ marginTop: '10px' }}>
                <Button text="اضف الصنف +" type="submit" />
            </div>
        </div>
      </motion.form>
      
    </div>
  )
}

export default WelcomeMedia