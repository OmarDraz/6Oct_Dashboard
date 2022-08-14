import React, {useState} from 'react'
import {motion} from 'framer-motion'
import Button from '../components/button/Button'
import Modal from '../components/modal/Modal'
import axiosInstance from '../axios'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useEffect } from 'react'
import IconButton from '../components/icon-button/IconButton'
import {MdDelete, MdEdit} from 'react-icons/md'
import {MdCancel, MdCheckCircle} from 'react-icons/md'


const Users = () => {
  const [user, setUser] = useState({
    first_name : '',
    last_name: '',
    password: '',
    phone: '',
    role: ''
  })

  const [users, setUsers] = useState([])

  const [selected, setSelected] = useState({})

  const handleChange = (e) => {
    const {name, value} = e.target
    setUser({...user, [name]: value})
  }
  const [addModal, setAddModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [editModal, setEditModal] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    axiosInstance.post('users/add_user', user).then((res) => {
      alert(res.data.message)
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    axiosInstance.get('users/').then((res) => {
      setUsers(res.data)
    })
  }, [])
  return (
    <div>
      <div className='flex__between'>
        <motion.h3 initial={{ x: 30 }} animate={{ x: 0 }} transition={{ duration: .5 }} className='heading'>المستخدمين</motion.h3>
        <Button text="أضف مستخدم" onClick={() => setAddModal(true)} />
      </div>
      <div style={{ marginTop: 30 }}>
        <Table style={{ borderCollapse: 'collapsed' }}>
        <Thead>
          <Tr>
            <Th align="right">الاسم</Th>
            <Th align="right">رقم الهاتف</Th>
            <Th align="center">الدور</Th>
            <Th align="center">عملية</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            users.map(user => (
              <motion.Tr initial={{ opacity: 0.2, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Td>{user.first_name} {user.last_name}</Td>
                <Td>{user.phone}</Td>
                <Td align="center">{user.role}</Td>
                <Td align="center">
                  <div className="flex__between" style={{ width: 60 }}>
                    <IconButton onclick={() => {
                      setEditModal(true)
                      setUser({
                        first_name: user.first_name,
                        last_name: user.last_name,
                        phone: user.phone,
                        password: user.password,
                        role: user.role
                      })
                    }} icon_color="secondary" icon={<MdEdit />} />
                    <IconButton onclick={() => {
                      setSelected({
                        name: `${user.first_name} ${user.last_name}`,
                        id: user.id
                      })
                      setDeleteModal(true)
                    }} icon_color="primary" icon={<MdDelete />} />
                  </div>
                </Td>
              </motion.Tr>
            ))
          }
        </Tbody>
      </Table>
      </div>

      <Modal toggle={addModal} setToggle={setAddModal} title="أضف مستخدم">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label for="name">الاسم الاول</label> &nbsp;
                <input required type="text" name="first_name" onChange={handleChange} value={user.first_name} id="name" />
            </div>
            <div className="form-group">
                <label for="name">الاسم الثاني</label> &nbsp;
                <input required type="text" name='last_name' onChange={handleChange} value={user.last_name} id="name" />
            </div>
            <div className="form-group">
                <label for="name">رقم الهاتف</label> &nbsp;
                <input type="text" name="phone" onChange={handleChange} value={user.phone} id="name" />
            </div>
            <div className="form-group">
                <label for="name">كلمة المرور</label> &nbsp;
                <input required type="password" name="password" onChange={handleChange} value={user.password} id="name" />
            </div>
            <div className="form-group">
                <label for="number">الدور</label> &nbsp;
                 <select required="required" onChange={handleChange} name="role">
                    <option value="">اختر الدور</option>
                    <option value="admin">مسؤول</option>
                    <option value="res">ريسبشن</option>
                    <option value="waiter">ويتر (Waiter)</option>
                 </select>
            </div>
            <div style={{ marginRight: 'auto' }}>
                <Button text="اضف  +" type="submit" />
            </div>
            </form>
      </Modal>

      <Modal toggle={editModal} setToggle={setEditModal} title={`تعديل المستخدم ${user.first_name}`}>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label for="name">الاسم الاول</label> &nbsp;
                <input required type="text" name="first_name" onChange={handleChange} value={user.first_name} id="name" />
            </div>
            <div className="form-group">
                <label for="name">الاسم الثاني</label> &nbsp;
                <input required type="text" name='last_name' onChange={handleChange} value={user.last_name} id="name" />
            </div>
            <div className="form-group">
                <label for="name">رقم الهاتف</label> &nbsp;
                <input type="text" name="phone" onChange={handleChange} value={user.phone} id="name" />
            </div>
            <div className="form-group">
                <label for="name">كلمة المرور</label> &nbsp;
                <input required type="password" name="password" onChange={handleChange} value={user.password} id="name" />
            </div>
            <div className="form-group">
                <label for="number">الدور</label> &nbsp;
                 <select required="required" onChange={handleChange} selected={user.role} name="role">
                    <option value="">اختر الدور</option>
                    <option selected={user.role === 'admin' ? true : false} value="admin">مسؤول</option>
                    <option selected={user.role === 'res' ? true : false} value="res">ريسبشن</option>
                    <option selected={user.role === 'waiter' ? true : false} value="waiter">ويتر (Waiter)</option>
                 </select>
            </div>
            <div style={{ marginRight: 'auto' }}>
                <Button text="اضف  +" type="submit" />
            </div>
            </form>
      </Modal>
      <Modal setToggle={setDeleteModal} toggle={deleteModal} title={`حذف الصنف ( ${selected.name} )`}>
          <div className="flex__center" style={{ flexDirection: 'column' }}>
              <h3>هل انت متأكد من انك تريد حذف هذا المستخدم ؟</h3>
              <div>
                  <MdCancel onClick={() => setDeleteModal(false)} style={{ fontSize: 32, color: 'green', cursor: 'pointer' }} /> &nbsp;
                  <MdCheckCircle style={{ fontSize: 32, color: 'red', cursor: 'pointer' }} onClick={() => {
                      axiosInstance.delete(`users/delete_user/${+selected.id}`).then(() => {                            
                          setUsers(users.filter((user) => user.id !== selected.id))
                          setDeleteModal(false)
                      })
                  }} />
              </div>
          </div>
      </Modal>
    </div>
  )
}

export default Users