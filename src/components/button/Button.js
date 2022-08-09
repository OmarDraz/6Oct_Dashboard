import React from 'react'
import './button.css'

const Button = ({text, type}) => {
  return (
    <button type={type ? type : ''}>{text}</button>
  )
}

export default Button