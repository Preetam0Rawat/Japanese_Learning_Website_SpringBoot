import React from 'react'

const Features = ({ title, image, text }) => {
    return (
        
        <div className='flex flex-col  w-[70vw] md:w-[40vw]    items-center'>
            <img src={image} alt="image" className='w-50 h-50 object-contain  md:w-50 md:h-50 md:p-5 animate-slideDown' />
            <div className='flex-1 text-center animate-slideUp'>
                <h1 className=' text-[25px]  pt-3 font-semibold'>{title}</h1>
                <p className='text-[18px] p-3  md:text-[22px] '>{text}</p>
            </div>
        </div>
    )
}

export default Features
