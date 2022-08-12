import React, {useEffect, useState} from 'react'
import BarChart from '../components/BarChart/BarChart'
import axiosInstance from '../axios'
import {motion} from 'framer-motion'
const Home = () => {
  const [statistics, setStatistics] = useState([])
  useEffect(() => {
      axiosInstance.get('statistics/').then((res) => setStatistics(res.data))
  },[])

  const options = {
    chart: {
      id: "basic-bar",
      width: '50%'
    },
    xaxis: {
      categories: statistics.map((s) => s.day)
    },
    colors: ['#AA986F'],
  }

  const series = [
    {
      name: "series-1",
      data: statistics.map((s) => s.da)
    }
  ]
  return (
    <div>
      <motion.h3 initial={{ x: 30 }} animate={{ x: 0 }} transition={{ duration: .5 }} className='heading'>الرئيسية</motion.h3>
      <div className='flex__center'>

      <BarChart options={options} series={series} />
      </div>
    </div>
  )
}

export default Home