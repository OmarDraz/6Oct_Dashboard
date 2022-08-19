import React, { useState, useEffect } from 'react'
import {motion} from 'framer-motion'
import Button from '../../components/button/Button'
import axios from 'axios'
import axiosInstance from '../../axios';

const AddProduct = () => {
    const [product, setProduct] = useState({
        ar_name: '',
        ar_description: '',
        en_name: '',
        en_description: '',
        price: '',
        calories: '',
        category: '',
        image: ''
    })
    const [categories, setCategories] = useState([])


    


    const handleChange = (e) => {
        const {name, value} = e.target
        setProduct({...product, [name]: value})
    }

    const handleImage = (e) => {
        setProduct({...product, image: e.target.files[0]})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(product)
        let formData = new FormData();
        formData.append('ar_name', product.ar_name)
        formData.append('ar_description', product.ar_description)
        formData.append('en_name', product.en_name)
        formData.append('en_description', product.en_description)
        formData.append('price', product.price)
        formData.append('calories', product.calories)
        formData.append('category', product.category)
        formData.append('image', product.image)

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const URL = `${process.env.REACT_APP_HOST_API}products/add_product`
        axios.post(URL, formData, config).then((res) => {
            alert(res.data.message)
            setProduct({
                ar_name: '',
                ar_description: '',
                en_name: '',
                en_description: '',
                price: '',
                calories: '',
                image: ''
            })
        })
    }

    useEffect(() => {
        axiosInstance.get('/categories/').then((res) => setCategories(res.data))
    }, [])

  return (
    <div>
      <div className='flex__between'>
        <motion.h3 initial={{ x: 30 }} animate={{ x: 0 }} transition={{ duration: .5 }} className='heading'>أضف منتج جديد</motion.h3>
        <Button text="عرض القائمة" />
      </div>  
      <motion.form initial={{ x: -30 }} animate={{ x: 0 }} transition={{ duration: .5 }} className="row" onSubmit={handleSubmit}>
        <div className="col-5 col-sm-12" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="form-group">
                <label for="name">اسم المنتج ( بالعربي )</label> &nbsp;
                <input required type="text" name="ar_name" onChange={handleChange} value={product.ar_name} id="ar_name" />
            </div>
            <div className="form-group">
                <label for="name">اسم المنتج ( بالانجليزي )</label> &nbsp;
                <input required type="text" name='en_name' onChange={handleChange} value={product.en_name} id="name" />
            </div>
            <div className="form-group">
                <label for="name">سعر المنتج</label> &nbsp;
                <input required type="number" name="price" onChange={handleChange} value={product.price} id="name" />
            </div>
            <div className="form-group">
                <label for="name">السعرات الحرارية</label> &nbsp;
                <input type="number" name="calories" onChange={handleChange} value={product.calories} id="name" />
            </div>
            <div className="form-group">
                <label for="number">الصنف</label> &nbsp;
                 <select required="required" onChange={handleChange} name="category">
                    <option value="">اختر الصنف</option>
                    {
                        categories.map((c) => (
                            <option value={c.id}>{c.ar_name}</option>
                        ))
                    }
                 </select>
            </div>
            <div className="form-group">
                <label for="name">صورة المنتج</label> &nbsp;
                <input type="file" name="image" onChange={handleImage} id="name" />
            </div>
        </div>
        <div className="col-6 col-sm-12">
            <div className="form-group">
                <label style={{ display: 'block' }} for="name">وصف المنتج ( بالعربي )</label> &nbsp;
                <textarea cols="30" name="ar_description" onChange={handleChange} value={product.ar_description} rows="10"></textarea>
            </div>
            <div className="form-group">
                <label style={{ display: 'block' }} for="name">وصف المنتج ( بالانجليزي )</label> &nbsp;
                <textarea cols="30" name="en_description" onChange={handleChange} value={product.en_description} rows="10"></textarea>
            </div>
        </div>
        <div style={{ marginTop: 'auto' }}>
            <Button text="اضف المنتج+" type="submit" />
            </div>
      </motion.form>
      
    </div>
  )
}

export default AddProduct