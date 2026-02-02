import React, { useEffect } from 'react'
import { useState } from 'react';
import { addStatusToProgress, getProgressStatus, removeProgressStatus } from '../api';

const KanjiInfo = ({ info }) => {
  const [selected, setSelected] = useState("Untracked");
  const token = localStorage.getItem("token")


  useEffect(() => {
    const fetchStatus = async () => {
      if (!token) {
        setSelected('Untracked');
        return;
      }
      try {
        const res = await getProgressStatus({kanjiId : info.id }, token);
        setSelected(res.data.status || 'Untracked')
      } catch (error) {
        console.log('Error fetching status :', error)
      }
    }
    fetchStatus();
  }, [info.id, token]);



  const handleSelect = async (status) => {
    if (!token) {
      alert('Please Sign up to use this functionality')
      return;
    }
    setSelected(status);

    // ✅ Perform actions depending on what is selected
    if (status === "Learning" || status === "Learned") {
      await addToProgress(status)
    }
    else {
      console.log("User stopped tracking this kanji.");
      await removeFromProgress()
    }
  };

  const addToProgress = async (status) => {
    try {
      console.log(info.id, token)
      const kanjiId = info.id
      const response = await addStatusToProgress({status, kanjiId}, token)
      console.log(response)
    } catch (error) {
      console.log("error is : ", error)
    }
  }

  const removeFromProgress = async () => {
    try {
      if(selected !=  'Untracked'){
        const kanjiId = info.id
        const response = await removeProgressStatus({kanjiId}, token);
        console.log("Stopped tracking this Kanji")
      }
    } catch (error) {
    }
  }


  return (
    <div className='flex flex-col flex-wrap  text-black lg:rounded-2xl  lg:gap-4 lg:mx-auto'>
      
      {/* {info.kanji}{info.jlpt} */}
      <div className='text-5xl  mb-5 lg:p-6 lg:rounded-lg  lg:text-8xl '>{info.kanji}</div>


      <div className=' flex justify-between text-sm px-3 lg:p-5 font-semibold lg:text-xl lg:mt-5'>
        <div className=' flex flex-col rounded-lg lg:gap-2'>
          <div className=' lg:font-semibold'>
            <span className=''>Newspaper Frequency : </span>
            <span>{info.freq_mainichi_shinbun}</span>
          </div>
          <div className=''>
            <span>JLPT Level : </span>
            <span>N{info.jlpt}</span>
          </div>
          <div className=''>
            <span>Stroke Count : </span>
            <span> {info.stroke_count}</span>
          </div>
        </div>
        <div className=''>
          <span>Kanji Name : </span>
          <span>{info.heisig_en}</span>
        </div>
      </div>


      <div className=' flex justify-around px-9 text-sm lg:text-xl font-semibold lg:p-6 mt-7 '>
        <div className=''>
          <h1 className='underline'>Kunyomi readings</h1>
          {info.kun_readings?.slice(0,5).map((m, i) => (
            <div key={i}>{m}</div>
          ))
          }
        </div>
        <div className=''>
          <h1 className='underline'>Meanings</h1>
          {info.meanings?.slice(0,5).map((m, i) => (
            <div key={i}>{m}</div>
          ))}
        </div>
        <div className=''>
          <h1 className='underline'>Onyomi readings</h1>
          {info.on_readings?.slice(0,8).map((m, i) => (
            <div key={i}>{m}</div>
          ))}
        </div>
      </div>


      {/* <div className=' flex justify-around text-xl font-semibold p-1 mt-2 bg-slate-300'>
        <div className=''>Learning</div>
        <div className=''>Learned</div>
        <div className=''>Untracked</div>
      </div> */}

      <div className="flex justify-around text-sm  lg:text-xl font-semibold lg:p-2 mt-5 rounded-xl">
        {["Learning", "Learned", "Untracked"].map((status) => (
          <div
            key={status}
            onClick={() => handleSelect(status)}
            className={`flex items-center gap-2 cursor-pointer px-2 lg:px-3 py-1 rounded-full transition 
            ${selected === status ? "bg-purple-500 text-white" : "bg-slate-700 text-white"}`}
          >
            <div
              className={`w-2 h-2 lg:w-4  lg:h-4 rounded-full border-2 ${selected === status ? "border-white bg-black" : "border-gray-400 bg-white"
                }`}
            ></div>
            <span>{status}</span>
          </div>
        ))}
      </div>


    </div>

    //  <div className="flex flex-col bg-slate-900 text-white rounded-2xl shadow-lg p-4 max-w-md mx-auto gap-4 sm:max-w-lg">

    //   {/* Kanji display */}
    //   <div className="text-6xl font-bold text-center bg-slate-700 rounded-lg py-4">
    //     {info.kanji}
    //   </div>

    //   {/* JLPT, Stroke count, Frequency */}
    //   <div className="flex justify-between bg-slate-800 rounded-lg p-3 text-sm sm:text-base">
    //     <div className="flex flex-col text-center">
    //       <span className="font-semibold">Freq</span>
    //       <span>{info.freq_mainichi_shinbun}</span>
    //     </div>
    //     <div className="flex flex-col text-center">
    //       <span className="font-semibold">JLPT</span>
    //       <span>{info.jlpt}</span>
    //     </div>
    //     <div className="flex flex-col text-center">
    //       <span className="font-semibold">Strokes</span>
    //       <span>{info.stroke_count}</span>
    //     </div>
    //   </div>

    //   {/* Meanings and Readings */}
    //   <div className="bg-slate-700 rounded-lg p-3 flex flex-col gap-2">
    //     <div>
    //       <span className="font-semibold text-amber-300">Meaning: </span>
    //       {info.meanings?.join(', ')}
    //     </div>
    //     <div>
    //       <span className="font-semibold text-amber-300">On: </span>
    //       {info.on_readings?.join(', ')}
    //     </div>
    //     <div>
    //       <span className="font-semibold text-amber-300">Kun: </span>
    //       {info.kun_readings?.join(', ')}
    //     </div>
    //   </div>

    //   {/* Heisig keyword */}
    //   <div className="bg-slate-800 rounded-lg text-center py-2 text-lg font-medium">
    //     “{info.heisig_en}”
    //   </div>

    //   {/* Learning status buttons */}
    //   <div className="flex justify-around bg-slate-700 rounded-lg p-2">
    //     <button className="bg-amber-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-amber-500 transition">
    //       Learning
    //     </button>
    //     <button className="bg-green-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-green-500 transition">
    //       Learned
    //     </button>
    //     <button className="bg-red-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-red-500 transition">
    //       Untrack
    //     </button>
    //   </div>
    // </div>
  )
}

export default KanjiInfo
