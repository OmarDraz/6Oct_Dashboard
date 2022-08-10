import React, {useState} from 'react'
import {motion} from 'framer-motion'
import Button from '../../components/button/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const AddCategory = () => {
  const [category, setCategory] = useState({
    ar_name: '',
    en_name: '',
    image: '',
  })

  let navigate = useNavigate()


  const handleChange = (e) => {
    const {name, value} = e.target
    setCategory({...category, [name]: value})
  }

  const handleImage = (e) => {
    setCategory({...category, image: e.target.files[0]})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let formData = new FormData();
        formData.append('ar_name', category.ar_name)
        formData.append('en_name', category.en_name)
        formData.append('image', category.image)

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const URL = 'http://localhost:3001/api/categories/add_category'
        axios.post(URL, formData, config).then((res) => {
            alert(res.data.message)
            setCategory({
                ar_name: '',
                en_name: '',
                image: ''
            })
        })
  }
  return (
    <div>
      <div className='flex__between'>
        <motion.h3 initial={{ x: 30 }} animate={{ x: 0 }} transition={{ duration: .5 }} className='heading'>أضف صنف جديد</motion.h3>
        <Button text="عرض الاصناف" onClick={() => navigate('/menu/categories')} />
      </div>  
      <motion.form initial={{ x: -30 }} animate={{ x: 0 }} transition={{ duration: .5 }} onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="form-group">
                <label for="name">اسم الصنف ( بالعربي )</label> &nbsp;
                <input required type="text" name="ar_name" onChange={handleChange} value={category.ar_name} id="ar_name" />
            </div>
            <div className="form-group">
                <label for="name">اسم الصنف ( بالانجليزي )</label> &nbsp;
                <input required type="text" name='en_name' onChange={handleChange} value={category.en_name} id="name" />
            </div>
            <div className="form-group">
                <label for="name">صورة الصنف</label> &nbsp;
                <input type="file" name="image" onChange={handleImage} id="name" />
            </div>
            <div style={{ marginTop: '10px' }}>
                <Button text="اضف الصنف +" type="submit" />
            </div>
        </div>
      </motion.form>
      
    </div>
  )
}

export default AddCategory