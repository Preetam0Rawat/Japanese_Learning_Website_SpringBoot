import React from 'react'

const KanjiLayout = ({data, onClick}) => {


  return (
    <div className='flex items-center flex-col justify-center w-20 h-20 lg:text-4xl border-2 border-white lg:w-24 lg:h-27 text-white lg:right-50% lg:top-50%  cursor-pointer' onClick={onClick}>
      <div className='flex-2 text-[30px]  lg:text-[40px] mt-2 px-2  lg:pt-1 border-2 border-white border-dotted'>{data.kanji}</div>
      <h1 className='flex-1 text-[14px] lg:text-[16px] text-center'>{(data.meanings[0]).length<=10? data.meanings[0]: data.meanings[0].slice(0,8)+'...'}</h1>
    </div>
  )
}

export default KanjiLayout
