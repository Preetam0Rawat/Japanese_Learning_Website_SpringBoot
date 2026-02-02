import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getKanjiByLevel, getKanjiDetails } from "../api/index.jsx";
import KanjiLayout from "../components/KanjiLayout.jsx";
import inkStone from '../images/inkstone.png'
import tableBG from '../images/tableBG.png'
import KanjiInfo from "../components/KanjiInfo.jsx";
import { FcUndo } from "react-icons/fc";
import { Link } from "react-router-dom";

const Kanji = () => {

    const [kanjis, setKanjis] = useState([])
    const [kanjiDetails, setKanjiDetails] = useState()
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const jlptLevel = parseInt(searchParams.get("level")) || 5
    const currentPage = parseInt(searchParams.get("page")) || 1

    const [loading, setLoading] = useState(true);


    const limit = 25;



    useEffect(() => {
        const fetchKanjis = async () => {
            try {
                setLoading(true);
                const response = await getKanjiByLevel(jlptLevel, currentPage, limit);
                setKanjis(response.data.kanjis);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Error fetching kanjis:", error);
            } finally {
                setLoading(false); // stop loading
            }
        };

        fetchKanjis();
    }, [jlptLevel, currentPage]);

    // Update the url via click pf the level buttons
    const updateQuery = (level, page) => {
        setSearchParams({ level, page });
    };


    const handleKanjiClick = async (kanjiId) => {
        try {
            const response = await getKanjiDetails(kanjiId)
            setKanjiDetails(response.data)
        } catch (error) {
            alert("error loading kanji details")
        }
    }

    return (
        <>
            <div className='hidden lg:block absolute  w-[85%] h-[90%] left-[7%] top-[3%] 2xl:w-[90%] 2xl:h-[95%] 2xl:left-[8%] ' >
                <img src={inkStone} alt="inkstone" className="w-full h-full" />
                {/* Pagination for desktop*/}
                <div className=" lg:absolute lg:bottom-4 z-1 w-full lg:left-1/4 sm:-translate-x-1/2 flex justify-center gap-4 ">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-40 cursor-pointer"
                        onClick={() => updateQuery(jlptLevel, currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>

                    <span className="text-xl font-semibold text-white">
                        Page {currentPage} / {totalPages}
                    </span>

                    <button
                        className="px-4 py-2 bg-white rounded-lg disabled:opacity-40 cursor-pointer"
                        onClick={() => updateQuery(jlptLevel, currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>

                </div>
            </div>



            <div className="absolute left-0 top-0 z-1 hidden sm:block">
                <Link to="/home">
                    <FcUndo size={100} className=" transition-transform duration-200 hover:scale-120" />
                </Link>
            </div>



            <div className='bg-cover bg-center bg-no-repeat w-full min-h-screen ' style={{ backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.3), rgba(0,0,0,0.3)),url(${tableBG})` }}>
                <h1 className="lg:hidden font-bold w-full text-center pt-3 text-3xl"  >Kanji N{jlptLevel}</h1>
                {/* Buttons */}
                <div className=" justify-evenly  flex pt-5 pb-5 lg:absolute  z-1 lg:top-40  lg:left-4 lg:flex-col  lg:justify-center   lg:gap-8">
                    {[5, 4, 3, 2, 1].map((level) => (
                        <button
                            key={level}
                            className={`cursor-pointer font-semibold border-2 lg:border-4 w-12 h-12 rounded-4xl lg:w-20 lg:h-20 lg:text-xl lg:rounded-[35px]  ${jlptLevel === level
                                ? "bg-violet-600 text-white"
                                : "bg-brown text-black hover:backdrop-brightness-50"
                                }`}
                            onClick={() => updateQuery(level, 1)}
                        >
                            N{level}
                        </button>
                    ))}
                </div>


                <div className='flex flex-col  flex-wrap h-full  lg:absolute  lg:flex-row lg:w-full'>
                    {/* left on desktop*/}

                    {loading ? (
                        <div className="flex justify-center items-center lg:justify-end w-full  top-30 lg:w-[50vw] lg:h-screen mb-5">
                            <p className="text-xl  mr-4 lg:text-3xl text-white lg:mr-5">Loading Data From Backend</p>
                            <div className="animate-spin rounded-full w-2 h-2 lg:h-12 lg:w-12 border-2  lg:border-4 border-white border-t-transparent"></div>
                        </div>
                    ) : (
                        <div className='flex flex-col mx-3 rounded-xl  h-[30vh] overflow-y-scroll relative  lg:w-[35%] lg:h-[75%] lg:left-[13%]  lg:top-[8%] 2xl:w-[40%] 2xl:h-[80%] 2xl:left-[13%]  2xl:top-[8%] bg-slate-600  lg:bg-transparent myScrollbar '>
                            <h1 className='hidden lg:block text-white text-5xl text-center'>KANJI LIST - N{jlptLevel}</h1>
                            <div className='flex flex-wrap justify-around p-4 gap-2 lg:gap-6 lg:mt-10 lg:ml-5 lg:mr-5 lg:h-160  '>
                                {/* {kanjis.map((kanji) => (
                                <KanjiLayout key={kanji._id} data={kanji} onClick={() => handleKanjiClick(kanji._id)} />
                            ))
                            } */}




                                {kanjis.map((kanji) => (
                                    <KanjiLayout
                                        key={kanji.id}
                                        data={kanji}
                                        onClick={() => handleKanjiClick(kanji.id)}
                                    />
                                ))}


                            </div>
                        </div>


                       
                    )}

                    {/* Pagination Controls - Mobile*/}
                    <div className="lg:hidden lg:absolute  w-full mt-1 lg:bottom-5   flex justify-center gap-3 lg:mt-10 ">
                        <button
                            className="px-4  bg-gray-300 rounded-lg disabled:opacity-40"
                            onClick={() => updateQuery(jlptLevel, currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>

                        <span className="text-xl font-semibold text-white">
                            Page {currentPage} / {totalPages}
                        </span>

                        <button
                            className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-40"
                            onClick={() => updateQuery(jlptLevel, currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>

                    </div>

                    {/* right on desktop*/}
                    <div className="  mx-3 mt-5   bg-[#f3973b]/50  rounded-2xl relative lg:bg-transparent lg:w-[35%] lg:h-[80%] lg:left-[15%]  lg:top-[5%] 2xl:w-[40%] 2xl:h-[85%] 2xl:left-[14%]  2xl:top-[6%]">
                        {kanjiDetails ? (
                            <div className="text-white text-5xl text-center py-1">
                                <KanjiInfo info={kanjiDetails} />
                            </div>
                        ) : (
                            <p className="text-gray-400 font-semibold  text-center mt-10 text-2xl">
                                Click a kanji to see details
                            </p>
                        )}
                    </div>


                </div>
            </div>
        </>
    )

}

export default Kanji;