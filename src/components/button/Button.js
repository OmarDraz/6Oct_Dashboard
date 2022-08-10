import React from 'react'
import './button.css'

const Button = ({text, type, onClick}) => {
  return (
    <button onClick={onClick ? onClick : ''} type={type ? type : ''}>{text}</button>
  )
}

export default Button