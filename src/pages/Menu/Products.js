import React, { useEffect, useState } from 'react'
import IconButton from '../../components/icon-button/IconButton'
import {MdDelete, MdEdit} from 'react-icons/md'
import {motion} from 'framer-motion'
import axiosInstance from '../../axios'
import Modal from '../../components/modal/Modal'
import {MdCancel, MdCheckCircle} from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'

const Products = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [deleteModal, setDeleteModal] = useState(false)
  const [selected, setSelected] = useState({})
  const [product] = useState({
    ar_name: '',
    en_name: '',
    image: ''
  })
  useEffect(() => {
    axiosInstance.get(`products/category/${id}`).then((res) => setProducts(res.data))
  },[product, id])

  return (
    <div>
        <motion.h3 initial={{ x: 30 }} animate={{ x: 0 }} transition={{ duration: .5 }} className='heading'>المنتجات</motion.h3>
        <div className="row">
            {
                products.map((pro) => (
                    <div className="col-3 col-sm-12 card">
                        <img alt="Product" src={pro.image} />
                        <div style={{ padding: 10 }} className="flex__between">
                            <h4>{pro.ar_name}</h4>
                            <h4>{pro.en_name}</h4>
                        </div>
                        <div className="blackHover">
                            <IconButton onclick={() => {
                                navigate(`/menu/edit_product/${pro.id}`)
                            }} icon_color="secondary" icon={<MdEdit />} /> &nbsp;&nbsp;&nbsp;
                            <IconButton onclick={() => {
                                setDeleteModal(true)
                                setSelected({
                                    ar_name: pro.ar_name,
                                    en_name: pro.en_name,
                                    id: pro.id,
                                })
                            }} icon_color="primary" icon={<MdDelete />} /> &nbsp;&nbsp;&nbsp;
                        </div>
                    </div>
                ))
            }
        </div>
        <Modal setToggle={setDeleteModal} toggle={deleteModal} title={`حذف المنتج ( ${selected.ar_name} )`}>
            <div className="flex__center" style={{ flexDirection: 'column' }}>
                <h3>هل انت متأكد من انك تريد حذف هذا المنتج ؟</h3>
                <div>
                    <MdCancel onClick={() => setDeleteModal(false)} style={{ fontSize: 32, color: 'green', cursor: 'pointer' }} /> &nbsp;
                    <MdCheckCircle style={{ fontSize: 32, color: 'red', cursor: 'pointer' }} onClick={() => {
                        axiosInstance.delete(`categories/delete_category/${+selected.id}`).then(() => {                            
                            setProducts(products.filter((cat) => cat.id !== selected.id))
                            setDeleteModal(false)
                        })
                    }} />
                </div>
            </div>
        </Modal>
    </div>
  )
}

export default Products