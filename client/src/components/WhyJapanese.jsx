import React from 'react'

const WhyJapanese = ({image, text}) => {
  return (
          <div className=' w-[90vw] flex  justify-center items-center  p-4 gap-4 md:flex-col md:w-[25vw] '>
            <img src={image} alt="" className='w-45 h-45  p-3 object-contain md:w-60 md:h-50 animate-slideRight' />
            <p className='flex-1 text-[24px] font-semibold  p-4 text-center animate-slideLeft'>{text}</p>
          </div>
  )
}

export default WhyJapanese
