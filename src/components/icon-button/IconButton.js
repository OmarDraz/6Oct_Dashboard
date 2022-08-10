import React from 'react'
import './iconButton.css'

const IconButton = ({icon, label, onclick, icon_color, color, variant, size, float}) => {

  const ICON_COLORS = [
      'primary',
      'secondary',
      'red',
  ]

  const COLORS = [
      'primary',
      'secondary',
      'red',
      'orange'
  ]

  const VARIANTS = [
      'squared',
      'circled'
  ]

  const SIZE = [
      'large',
      'medium'
  ]

  const iconColor = ICON_COLORS.includes(icon_color) ? icon_color : ICON_COLORS[0];
  const btnVariant = VARIANTS.includes(variant) ? variant : VARIANTS[0];
  const btnSize = SIZE.includes(size) ? size : SIZE[0];
  const btnColor = COLORS.includes(color) ? color : COLORS[0];

  return (
    <div onClick={onclick} style={{ flexDirection: 'column' }} className={`${variant === 'squared' ? 'flex__center' : 'flex__end'}`}>
        <div className={`icon-button ${float && 'float'} ${btnVariant === 'squared' && `icon-button-${iconColor}`} ${btnVariant === 'circled' && `icon-button-${btnVariant}-${btnSize}-${btnColor}`}`}>
            {icon}
        </div>
        {
            label && <p className='mt-4 iconBtnLabel'>{label}</p>
        }  
    </div>
  )
}

export default IconButton