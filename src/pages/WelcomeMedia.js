import React, {useState} from 'react'
import { motion } from 'framer-motion'
import Button from '../components/button/Button'
import axios from 'axios'
import Modal from '../components/modal/Modal'
const WelcomeMedia = () => {
  const [imageModal, setImageModal] = useState(false)
  const [videoModal, setVideoModal] = useState(false)
  const [media, setMedia] = useState({
    image: '',
    video: ''
  })
  const handleImage = (e) => {
    setMedia({...media, [e.target.name] : e.target.files[0]})
  }

  const handleImageSubmit = (e) => {
    e.preventDefault()
    let formData = new FormData();
    formData.append('image', media.image)
    console.log(media.image)
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const URL = `${process.env.REACT_APP_HOST_API}media/update_image`
        axios.post(URL, formData, config).then((res) => {
            alert(res.data.message)
            setMedia({
                image: '',
                video: ''
            })
        })
  }

  const handleVideoSubmit = (e) => {
    e.preventDefault()
    let formData = new FormData();
    console.log(media.video)
    formData.append('video', media.video)

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const URL = `${process.env.REACT_APP_HOST_API}media/update_video`
        axios.post(URL, formData, config).then((res) => {
            alert(res.data.message)
            setMedia({
                image: '',
                video: ''
            })
        })
  }
  return (
    <>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .3 }} exit={{ opacity: 0 }}>
      <motion.h3 initial={{ x: 30 }} animate={{ x: 0 }} transition={{ duration: .5 }} className='heading'>وسائط الترحيب</motion.h3>
      <motion.div initial={{ x: -30 }} animate={{ x: 0 }} transition={{ duration: .5 }}  className='row'>
        <div onClick={() => setImageModal(true)} className='box col-3 col-sm-12'>
          <span>صورة</span>
        </div>
        <div onClick={() => setVideoModal(true)} className='box col-3 col-sm-12'>
          <span>فيديو</span>
        </div>
      </motion.div>
    </motion.div>
    <Modal toggle={imageModal} setToggle={setImageModal}>
        <motion.form initial={{ x: -30 }} animate={{ x: 0 }} transition={{ duration: .5 }} onSubmit={handleImageSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="form-group">
                    <label for="name">اختيار</label> &nbsp;
                    <input type="file" name="image" onChange={handleImage} id="name" />
                    {/* {
                        selected.image && (
                            <p>الحالي <a rel="noreferrer" target="_blank" href={selected.image}>{selected.image.split('${process.env.HOST}/uploads/')}</a></p>
                        )
                    } */}
                </div>
                <div style={{ marginTop: '10px' }}>
                    <Button text="ارسال" type="submit" />
                </div>
            </div>
        </motion.form>
    </Modal>
    <Modal toggle={videoModal} setToggle={setVideoModal}>
        <motion.form initial={{ x: -30 }} animate={{ x: 0 }} transition={{ duration: .5 }} onSubmit={handleVideoSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="form-group">
                    <label for="name">اختيار</label> &nbsp;
                    <input type="file" name="video" onChange={handleImage} id="name" />
                    {/* {
                        selected.image && (
                            <p>الحالي <a rel="noreferrer" target="_blank" href={selected.image}>{selected.image.split('${process.env.HOST}/uploads/')}</a></p>
                        )
                    } */}
                </div>
                <div style={{ marginTop: '10px' }}>
                    <Button text="ارسال" type="submit" />
                </div>
            </div>
        </motion.form>
    </Modal>
    </>  
  )
}

export default WelcomeMedia