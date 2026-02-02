import bug from '../images/bug.png'
import kanji from '../images/kanji.png'
import signupLog from '../images/signupLog.png'
import vocabBooks from '../images/vocabBooks.png'
import progressPot from '../images/progressPot.png'
import dashboard from '../images/dashboard.png'
import { useNavigate } from 'react-router-dom'         // Can also use <Link> from react-router-dom
import homeBG from '../images/homeBG.jpg'
import ItemCount from '../components/ItemCount'

const Home = () => {
   const navigate = useNavigate()

   return (

      <div>
         <div className='flex flex-wrap  bg-no-repeat bg-bottom h-dvh w-full sm:h-screen sm:bg-cover sm:bg-center' style={{ backgroundImage: `url(${homeBG})` }}>



            <div className='relative w-[50%] h-[33%]  md:w-[33%] md:h-[50%] xl:w-[33%] '>
               <div className=' absolute top-[25%] left-[15%]  w-[75%] h-[50%] sm:top-[30%] sm:h-[60%] md:top-[40%] md:left-[20%] md:w-[70%] md:h-[40%] xl:w-[60%] xl:h-[50%]  xl:top-[30%]'>
                  <img className=' relative w-full h-full object-fit  custom-shadow' src={dashboard} />
                  <div className='absolute top-[30%] left-[20%] w-[80%] h-[60%]   -rotate-3 '>
                     <ItemCount />
                  </div>
               </div>
            </div>

            <div className=' relative w-[50%] h-[33%]  md:w-[33%] md:h-[50%] xl:w-[33%] '>
               <div className=" absolute group  flex  flex-col items-center  text-white duration-200 group transition-transform ease-in-out hover:scale-105 hover:-translate-y-3 top-[25%] left-[15%]  w-[75%] h-[50%] sm:top-[30%] sm:h-[60%] md:left-[20%] md:top-[20%]  md:w-[70%] md:h-[60%] xl:top-[20%] xl:w-[50%] xl:h-[50%]   xl:left-[25%]">
                  <h1 className='bg-white text-black text-[88%] font-semibold p-2 text-center  rounded-4xl opacity-100  group-hover:opacity-100 md:text-xl sm:opacity-0'>Report Bugs</h1>
                  <img className='relative w-[90%] h-[90%] sm:w-[70%] sm:h-[70%] object-fit  custom-shadow' src={bug} onClick={() => navigate("/report")} />
               </div>
            </div>

            <div className=' relative w-[50%] h-[33%]  md:w-[33%] md:h-[50%] xl:w-[33%] '>
               <div className="absolute group  flex  flex-col items-center  text-white duration-200 group transition-transform ease-in-out hover:scale-105 hover:-translate-y-3 top-[25%] left-[15%]  w-[75%] h-[50%] sm:top-[30%] sm:h-[60%] md:left-[20%] md:w-[70%] md:h-[60%] xl:left-[30%] xl:w-[60%] xl:h-[60%] ">
                  <h1 className='bg-white text-black text-[88%] font-semibold p-2 text-center  rounded-4xl opacity-100  group-hover:opacity-100 md:text-xl sm:opacity-0'>Sign Up</h1>
                  <img className='relative w-[90%] h-[90%]  sm:w-[60%] sm:h-[80%] object-fit  custom-shadow' src={signupLog} onClick={() => navigate("/signup")} />
               </div>
            </div>  
            
            <div className=' relative w-[50%] h-[33%]  md:w-[33%] md:h-[50%] xl:w-[33%]'>
               <div className="absolute group  flex  flex-col items-center  text-white duration-200 group transition-transform ease-in-out hover:scale-105 hover:-translate-y-3 top-[25%] left-[15%]  w-[75%] h-[50%] sm:top-[30%] sm:h-[60%]  md:top-[10%] md:left-[15%] md:w-[90%] md:h-[60%] xl:left-[25%] xl:top-[15%] xl:w-[70%] xl:h-[60%]  ">
                  <h1 className='bg-white text-black text-[88%] font-semibold p-2 text-center  rounded-4xl opacity-100  group-hover:opacity-100 md:text-xl sm:opacity-0'>Kanji</h1>
                  <img className='relative w-[90%] h-[90%] sm:w-[60%] sm:h-[80%] object-fit  custom-shadow' src={kanji} onClick={() => navigate("/kanji")} />
               </div>
            </div>  
            
            <div className=' relative w-[50%] h-[33%]  md:w-[33%] md:h-[50%] xl:w-[33%] '>
               <div className="absolute group  flex  flex-col items-center  text-white duration-200 group transition-transform ease-in-out hover:scale-105 hover:-translate-y-3 top-[25%] left-[15%]  w-[75%] h-[50%] sm:top-[30%] sm:h-[60%] md:left-[15%] md:top-[30%]  md:w-[80%] md:h-[60%] xl:w-[65%] xl:h-[65%] xl:left-[20%]">
                  <h1 className='bg-white text-black text-[88%] font-semibold p-2 text-center  rounded-4xl opacity-100  group-hover:opacity-100 md:text-xl sm:opacity-0'>Progress</h1>
                  <img className='relative w-[90%] h-[90%] sm:w-[50%] sm:h-[90%] object-fit  custom-shadow' src={progressPot} onClick={() => navigate("/progress")} />
               </div>
            </div>  
            
            <div className=' relative w-[50%] h-[33%]  md:w-[33%] md:h-[50%] xl:w-[33%] '>
               <div className="absolute group  flex  flex-col items-center  text-white duration-200 group transition-transform ease-in-out hover:scale-105 hover:-translate-y-3 top-[25%] left-[15%]  w-[75%] h-[50%] sm:top-[30%] sm:h-[60%] md:left-[10%] md:top-[15%] md:w-[85%] md:h-[60%] xl:w-[65%] xl:h-[60%]  xl:left-[15%] xl:top-[15%]">
                  <h1 className='bg-white text-black text-[88%] font-semibold p-2 text-center  rounded-4xl opacity-100  group-hover:opacity-100 md:text-xl sm:opacity-0'>Vocabulary</h1>
                  <img className='relative w-[90%] h-[90%] sm:w-[50%] sm:h-[70%] object-fit  custom-shadow' src={vocabBooks} onClick={() => navigate("/vocabulary")} />
               </div>
            </div>





            {/* <div className=' relative sm:w-150 sm:h-110 w-20 h-20'>
               <div className="absolute group  flex  flex-col items-center sm:top-30 sm:left-35  text-white text-sm px-3 py-1 duration-200 group transition-transform ease-in-out hover:scale-105 hover:-translate-y-3">
                  <h1 className='bg-white text-black text-xl font-semibold px-2 text-center  rounded-4xl opacity-0 group-hover:opacity-100 '>Signup</h1>
                  <img className='sm:w-70 sm:h-70 object-contain cursor-pointer custom-shadow' src={signupLog} onClick={() => navigate("/signup")} />
               </div>
            </div>    

            <div className=' relative sm:w-150 sm:h-110 w-20 h-20'>
               <div className="absolute group  flex  flex-col items-end sm:top-20 sm:left-25  text-white text-sm px-3 py-1 duration-200 group transition-transform ease-in-out hover:scale-105 hover:-translate-y-3">
                  <h1 className='bg-white text-black text-xl font-semibold px-2 text-center  rounded-4xl opacity-0 group-hover:opacity-100 '>Kanji</h1>
                  <img className='sm:w-95 sm:h-90 object-contain cursor-pointer custom-shadow' src={kanji} onClick={() => navigate("/kanji")} />
               </div>
            </div>

             <div className=' relative sm:w-150 sm:h-110 w-20 h-20'>
               <div className="absolute group  flex  flex-col items-center sm:top-20 sm:left-35  text-white text-sm px-3 py-1  duration-200 group transition-transform ease-in-out hover:scale-105 hover:-translate-y-3">
                  <h1 className='px-2 bg-white text-black text-xl font-semibold  text-center  rounded-4xl opacity-0 group-hover:opacity-100 '>Progress</h1>
                  <img className='sm:w-80 sm:h-90 object-contain cursor-pointer custom-shadow' src={progressPot} onClick={() => navigate("/progress")} />
               </div>
            </div>
   
               <div className=' relative sm:w-150 sm:h-110 w-20 h-20'>
               <div className="absolute group  flex  flex-col items-center sm:top-30 sm:left-35  text-white text-sm px-3 py-1 duration-200 group transition-transform ease-in-out hover:scale-105 hover:-translate-y-3">
                  <h1 className='bg-white px-2 text-black text-xl font-semibold text-center  rounded-4xl opacity-0 group-hover:opacity-100 '>Vocabulary</h1>
                  <img className='sm:w-80 sm:h-80 object-contain cursor-pointer custom-shadow'src={vocabBooks} onClick={() => navigate("/vocabulary")} />
               </div>
            </div> */}

         </div>
      </div>
   )
}

export default Home;