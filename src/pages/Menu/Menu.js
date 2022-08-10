import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  let navigate = useNavigate()
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .3 }} exit={{ opacity: 0 }}>
      <motion.h3 initial={{ x: 30 }} animate={{ x: 0 }} transition={{ duration: .5 }} className='heading'>القائمة</motion.h3>
      <motion.div initial={{ x: -30 }} animate={{ x: 0 }} transition={{ duration: .5 }}  className='row'>
        <div onClick={() => navigate('/menu/add_category')} className='box col-3 col-sm-12'>
          <span>أضف صنف</span>
        </div>
        <div onClick={() => navigate('/menu/add_product')} className='box col-3 col-sm-12'>
          <span>أضف منتج</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Menu