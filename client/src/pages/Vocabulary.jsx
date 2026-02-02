import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import React from 'react'
import tableBG from '../images/tableBG.png'
import vocabBG from '../images/vocab.png'
import { getVocabByLevel } from "../api";
import VocabLayout from "../components/VocabLayout";
import { FcUndo } from "react-icons/fc";
import { Link } from "react-router-dom";


const Vocabulary = () => {

  const [vocab, setVocab] = useState([])
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const jlptLevel = parseInt(searchParams.get("level")) || 5
  const currentPage = parseInt(searchParams.get("page")) || 1
  const limit = 6;
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchVocab = async () => {
      try {
        setLoading(true);
        const response = await getVocabByLevel(jlptLevel, currentPage, limit);
        console.log(response.data.vocab)
        setVocab(response.data.vocabs);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching kanjis:", error);
      } finally {
        setLoading(false); // stop loading
      }
    };

    fetchVocab();
  }, [jlptLevel, currentPage]);

  const updateQuery = (level, page) => {
    setSearchParams({ level, page });
  };

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <img src={tableBG} className="w-full h-full object-cover" />
      </div>

      <div className="absolute -z-1 hidden sm:block sm:left-[25%]  sm:w-[60%] xl:w-[800px] xl:left-[30%]  h-dvh">
        <img src={vocabBG} alt="notebook" className="w-full h-full" />
        <p className="absolute top-[5%] text-center text-3xl  w-full font-bold">Vocaublary JLPT-N{jlptLevel}</p>


        <div className='sm:absolute w-[75%] top-[10%] left-[20%] text-center flex flex-col gap-3'>
          {loading ? (
            <div className="flex justify-center  items-center w-full mt-30 p-5">
              <p className="text-2xl mr-5">Fetching Data From Backend</p>
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent "></div>
            </div>
          ) : (
            vocab.map((v) => (<VocabLayout key={v.id} data={v} />))
          )
          }
        </div>


        {/* Pagination for desktop*/}
        <div className=" sm:absolute sm:bottom-12 w-full sm:left-1/2 sm:-translate-x-1/2 flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-[#A0522D]/90  cursor-pointer rounded-lg disabled:opacity-40 font-semibold"
            onClick={() => updateQuery(jlptLevel, currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <span className="text-xl font-semibold text-black">
            Page {currentPage} / {totalPages}
          </span>

          <button
            className="px-4 py-2 bg-[#A0522D]/90  cursor-pointer rounded-lg disabled:opacity-40 font-semibold"
            onClick={() => updateQuery(jlptLevel, currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>

        </div>
      </div>

      <div className="absolute left-0 top-0 hidden sm:block">
        <Link to="/home">
          <FcUndo size={100} className=" transition-transform duration-200 hover:scale-120" />
        </Link>
      </div>

      <h1 className="font-bold text-3xl text-center sm:hidden">VOCABULAY</h1>
      {/* JLPT Levels buttons */}
      <div className="justify-evenly w-full flex pt-4 pb-4 sm:absolute  sm:left-[10%] sm:top-40  sm:flex-col  sm:justify-center  sm:w-auto sm:gap-8 ">
        {[5, 4, 3, 2, 1].map((level) => (
          <button
            key={level}
            className={`cursor-pointer font-semibold border-2 sm:border-4 w-12 h-12 rounded-4xl sm:w-20 sm:h-20 sm:text-xl sm:rounded-[35px]   ${jlptLevel === level
              ? "bg-violet-600 text-white"
              : "bg-brown text-black hover:backdrop-brightness-50"
              }`}
            onClick={() => updateQuery(level, 1)}
          >
            N{level}
          </button>
        ))}
      </div>

      <div className=' relative w-screen sm:hidden '>
        <div className='sm:absolute w-full'>
          <div className='flex flex-col gap-3'>
            {/* {vocab.map((v) => (<VocabLayout key={v._id} data={v} />))} */}
            {loading ? (
              <div className="flex justify-center items-center w-full h-full bg-white">
                <p className="text-xl lg:text-2xl mr-5">Fetching Data From Backend</p>
                <div className="animate-spin rounded-full h-2 w-2 border-2 lg:h-12 lg:w-12 lg:border-4 border-black border-t-transparent"></div>
              </div>
            ) : (
              // vocab.map((v) => (<VocabLayout key={v._id} data={v} />))
              <div className="flex flex-col gap-2">
                {vocab.map((v) => (<VocabLayout key={v.id} data={v} />))}
              </div>
            )
            }
          </div>
          {/* Pagination- for mobile */}
          <div className=" sm:hidden flex justify-center gap-4 mt-3">
            <button
              className="px-4 py-2 bg-[#A0522D]/90  rounded-lg disabled:opacity-40 font-semibold"
              onClick={() => updateQuery(jlptLevel, currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            <span className="text-xl font-semibold text-black ">
              Page {currentPage} / {totalPages}
            </span>

            <button
              className="px-4 py-2 bg-[#A0522D]/90  cursor-pointer   rounded-lg disabled:opacity-40 font-semibold"
              onClick={() => updateQuery(jlptLevel, currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>

          </div>

        </div>

      </div>




    </>
  )
}

export default Vocabulary
