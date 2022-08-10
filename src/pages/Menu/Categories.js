import React, { useEffect, useState } from 'react'
import IconButton from '../../components/icon-button/IconButton'
import {MdDelete, MdEdit} from 'react-icons/md'
import {motion} from 'framer-motion'
import axiosInstance from '../../axios'

const Categories = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    axiosInstance.get('/categories').then((res) => setCategories(res.data))
  },[])
  return (
    <div>
        <motion.h3 initial={{ x: 30 }} animate={{ x: 0 }} transition={{ duration: .5 }} className='heading'>الاصناف</motion.h3>
        <div className="row">
            {
                categories.map((cat) => (
                    <div className="col-3 col-sm-12 card">
                        <img src={cat.image} />
                        <div style={{ padding: 10 }} className="flex__between">
                            <h4>{cat.ar_name}</h4>
                            <h4>{cat.en_name}</h4>
                        </div>
                        <div className="blackHover">
                            <IconButton icon_color="secondary" icon={<MdEdit />} /> &nbsp;
                            <IconButton icon_color="primary" icon={<MdDelete />} />
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Categories