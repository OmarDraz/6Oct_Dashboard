import React from 'react'
import Chart from "react-apexcharts";

const BarChart = ({options, series}) => {

  return (
    <Chart
    options={options}
    series={series}
    type="bar"
    width="500"
  />
  )
}

export default BarChart