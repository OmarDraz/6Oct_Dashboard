import React, { useEffect, useState } from 'react'
import IconButton from '../../components/icon-button/IconButton'
import {MdDelete, MdEdit} from 'react-icons/md'
import {motion} from 'framer-motion'
import axiosInstance from '../../axios'
import Modal from '../../components/modal/Modal'
import {MdCancel, MdCheckCircle} from 'react-icons/md'
import axios from 'axios'
import Button from '../../components/button/Button'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [deleteModal, setDeleteModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [selected, setSelected] = useState({})
  const [category, setCategory] = useState({
    ar_name: '',
    en_name: '',
    image: ''
  })
  useEffect(() => {
    axiosInstance.get('/categories').then((res) => setCategories(res.data))
  },[category])

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

        const URL = `http://localhost:3001/api/categories/update_category/${+category.id}`
        axios.put(URL, formData, config).then((res) => {
            alert(res.data.message)
            console.log(res)
            setCategory({
                id: '',
                ar_name: '',
                en_name: '',
                image: ''
            })
        })
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setCategory({...category, [name]: value})
  }

  const handleImage = (e) => {
    setCategory({...category, image: e.target.files[0]})
  }
  return (
    <div>
        <motion.h3 initial={{ x: 30 }} animate={{ x: 0 }} transition={{ duration: .5 }} className='heading'>الاصناف</motion.h3>
        <div className="row">
            {
                categories.map((cat) => (
                    <div className="col-3 col-sm-12 card">
                        <img alt="Category" src={cat.image} />
                        <div style={{ padding: 10 }} className="flex__between">
                            <h4>{cat.ar_name}</h4>
                            <h4>{cat.en_name}</h4>
                        </div>
                        <div className="blackHover">
                            <IconButton onclick={() => {
                                setEditModal(true)
                                axiosInstance.get(`categories/${cat.id}`).then((res) => {
                                    setCategory({
                                        ar_name: res.data.data.ar_name,
                                        en_name: res.data.data.en_name,
                                        id: res.data.data.id
                                    })
                                    setSelected({
                                        ar_name: cat.ar_name,
                                        en_name: cat.en_name,
                                        id: cat.id,
                                        image: res.data.data.image
                                    })
                                })
                            }} icon_color="secondary" icon={<MdEdit />} /> &nbsp;&nbsp;&nbsp;
                            <IconButton onclick={() => {
                                setDeleteModal(true)
                                setSelected({
                                    ar_name: cat.ar_name,
                                    en_name: cat.en_name,
                                    id: cat.id,
                                })
                            }} icon_color="primary" icon={<MdDelete />} />
                        </div>
                    </div>
                ))
            }
        </div>
        <Modal setToggle={setDeleteModal} toggle={deleteModal} title={`حذف الصنف ( ${selected.ar_name} )`}>
            <div className="flex__center" style={{ flexDirection: 'column' }}>
                <h3>هل انت متأكد من انك تريد حذف هذا الصنف ؟</h3>
                <div>
                    <MdCancel onClick={() => setDeleteModal(false)} style={{ fontSize: 32, color: 'green', cursor: 'pointer' }} /> &nbsp;
                    <MdCheckCircle style={{ fontSize: 32, color: 'red', cursor: 'pointer' }} onClick={() => {
                        axiosInstance.delete(`categories/delete_category/${+selected.id}`).then(() => {                            
                            setCategories(categories.filter((cat) => cat.id !== selected.id))
                            setDeleteModal(false)
                        })
                    }} />
                </div>
            </div>
        </Modal>
        <Modal setToggle={setEditModal} toggle={editModal} title={`تعديل الصنف ( ${selected.ar_name} )`}>
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
                        {
                            selected.image && (
                                <p>الحالي <a rel="noreferrer" target="_blank" href={selected.image}>{selected.image.split('http://127.0.0.1:3001/productsImages/')}</a></p>
                            )
                        }
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <Button text="تعديل" type="submit" />
                    </div>
                </div>
            </motion.form>
        </Modal>
    </div>
  )
}

export default Categories