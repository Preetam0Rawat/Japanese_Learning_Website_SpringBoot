import React, { useEffect } from 'react'
import { useState } from 'react';
import { addStatusToProgress, getProgressStatus, removeProgressStatus } from '../api';

const VocabLayout = ({ data }) => {
  const [selected, setSelected] = useState("Untracked");
  const token = localStorage.getItem("token")


  useEffect(() => {
    const fetchStatus = async () => {
      if (!token) {
        setSelected('Untracked');
        return;
      }
      try {
        const res = await getProgressStatus({ vocabularyId: data.id }, token);
        setSelected(res.data.status || 'Untracked')
      } catch (error) {
        console.log('Error fetching status :', error)
      }
    }
    fetchStatus();
  }, [data.id, token]);

  const handleSelect = async (status) => {
    if (!token) {
      alert('Please Sign up to use this functionality')
      return;
    }
    setSelected(status);

    if (status === "Learning" || status === "Learned") {
      await addToProgress(status)
    }
    else {
      await removeFromProgress()
    }
  };

  const addToProgress = async (status) => {
    try {
      console.log(data.id, token)
      const vocabularyId = data.id
      const response = await addStatusToProgress({ status, vocabularyId }, token)
      console.log(response)
    } catch (error) {
      console.log("error is : ", error)
    }
  }

  const removeFromProgress = async () => {
    try {
      if(selected != 'Untracked'){
        const vocabularyId = data.id
        const response = await removeProgressStatus({ vocabularyId }, token);
        console.log("Stopped tracking this Vocabulary")
      }
    } catch (error) {
      console.log("Error removing progress:", error);
    }
  }



  return (<>
    <div className='bg-[#cd853f] '>

      <div className="sm:flex  p-3 items-start font-semibold rounded-2xl shadow-md bg-white/85  "> 
        {/*left sm:left */}
        <div className='flex sm:flex-3'>
          <div className="flex flex-col flex-1 items-start">
            <p className="text-xl  text-gray-900">{data.word}</p>
            <p className="text-sm text-gray-500">{data.furigana}</p>
          </div>

          {/*right sm:center */}
          <div className="flex flex-col flex-2 items-start">
            <p className="text-green-600 text-sm">JLPT: N{data.jlpt}</p>
            <p className="text-gray-800 ">Meanings : {data.meaning}</p>
            
          </div>

        </div>

        {/*  bottom sm:right */}
        <div className="flex sm:flex-col  sm:flex-1 justify-around text-sm font-semibold rounded-xl gap-1">
          {["Learning", "Learned", "Untracked"].map((status) => (
            <div
              key={status}
              onClick={() => handleSelect(status)}
              className={`sm:w-28 flex px-1 items-center gap-2 cursor-pointerpx-2 sm:py-1  rounded-full transition  cursor-pointer
              ${selected === status ? "bg-[#cd853f] text-white" : "bg-[#cd853f]/40 text-white"}`}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 ${selected === status ? "border-white bg-[#644117]" : "border-gray-400 bg-white"
                  }`}
              ></div>
              <span>{status}</span>
            </div>
          ))}
        </div>


      </div>

    </div>
  </>
  )
}

export default VocabLayout





  // <div className='bg-[#cd853f] w-full'>

  //     <div className="sm:flex sm:flex-wrap sm:justify-between p-3 items-start font-semibold rounded-2xl shadow-md bg-white/85   sm:p-2 sm:w-150"> 
  //       <div className='flex'>
  //         <div className="flex flex-col flex-1 sm:flex-1">
  //           <p className="text-xl sm:text-2xl text-gray-900">{data.word}</p>
  //           <p className="text-sm text-gray-500">{data.furigana}</p>
  //         </div>

  //         <div className="flex flex-col flex-1  sm:flex-2">
  //           <p className="text-green-600 text-sm">JLPT: N{data.jlpt}</p>
  //           <p className="text-gray-800 ">Meanings : {data.meaning}</p>
  //         </div>

  //       </div>

  //       <div className="flex sm:flex-col  flex-1 justify-around text-sm font-semibold rounded-xl gap-1">
  //         {["Learning", "Learned", "Untracked"].map((status) => (
  //           <div
  //             key={status}
  //             onClick={() => handleSelect(status)}
  //             className={`sm:w-28 flex items-center gap-2 cursor-pointerpx-2 sm:py-1  rounded-full transition 
  //             ${selected === status ? "bg-[#cd853f] text-white" : "bg-[#cd853f]/40 text-white"}`}
  //           >
  //             <div
  //               className={`w-4 h-4 rounded-full border-2 ${selected === status ? "border-white bg-[#644117]" : "border-gray-400 bg-white"
  //                 }`}
  //             ></div>
  //             <span>{status}</span>
  //           </div>
  //         ))}
  //       </div>


  //     </div>

  //   </div>