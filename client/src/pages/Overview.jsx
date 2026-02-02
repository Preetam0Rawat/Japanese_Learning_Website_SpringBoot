import React from 'react'
import { useNavigate } from 'react-router-dom'
import bgImage from '../images/tableBG.png'
import bug from '../images/bug.png'
import kanji from '../images/kanji.png'
import signupLog from '../images/signupLog.png'
import vocabBooks from '../images/vocabBooks.png'
import progressPot from '../images/progressPot.png'
import career from '../images/career.png'
import music from '../images/music.png'
import japaneseCulture from '../images/japaneseCulture.png'
import Features from '../components/Features.jsx'
import WhyJapanese from '../components/WhyJapanese.jsx'
const OverView = () => {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/home')
  }
  return (

    <div className='w-full  bg-size-[15%_15%] ' style={{ backgroundImage: `url(${bgImage})` }}>

      <div className="flex flex-col justify-center items-center " style={{ perspective: "1000px" }}>
        <div className='text-[clamp(1rem,4vw,2.5rem)] h-[10vh] w-full pl-[12%] pt-7  font-bold'>
          STUDY DESK
        </div>
        <div className='w-[80vw] h-[70vh] bg-[#8b4513]/25 rounded-2xl shadow-xl hover:translate-z-10 transition-transform duration-300 shadow-[#8b4513] flex justify-center items-center'>
          <button onClick={handleClick} className='p-3 border-8 text-2xl font-semibold border-[#b17144]  bg-[#ebd7d7da] rounded-3xl w-50 h-20 cursor-pointer'> Get Started</button>
        </div>
      </div>

      <div className='  mt-20'>
        <h1 className='text-center text-[clamp(20px,4vw,45px)] font-bold pt-6'>Why Our Site?</h1>
        {/* We Offer */}
        <div className='flex flex-wrap justify-evenly gap-25 md:gap-30  mt-10'>
          <Features title='Kanji' image={kanji} text="With Study Desk, learn over 2,000 kanji, arranged neatly and categorized according to the five JLPT levels. These kanji are selected especially for daily life activities, with each kanji properly explained for better understanding."
          />
          <Features title='Vocabulary' image={vocabBooks} text="Along with kanji, learn the 10,000 most commonly used words to master the Japanese language. The vocabulary is also divided into five JLPT levels for people looking to take the language exam."
          />
          <Features title='Register and Start Learning' image={signupLog} text="Users must sign up to start tracking their Japanese language journey. Don't want to? Don't worry, you can still check out the kanji and vocabulary sections just fine."
          />
          <Features title='Help This Site Improve' image={bug} text="Study Desk is still in its early days, and many issues may still be around the corner. Report any bug you come across so we can get better every passing day."
          />
          <Features title='Track Your Progress' image={progressPot} text="Every kanji or vocabulary word gives you two status options: 'Learning' and 'Learned'. Use these to track your progress accordingly."
          />
        </div>
      </div>

      <div className='  mt-20'>
        <h1 className='text-center text-[clamp(20px,4vw,45px)] font-bold pt-6'>Why Learn Japanese?</h1>
        {/* Why Japanese  */}
        <div className='flex flex-col items-center mt-10 w-full  justify-around  md:flex-row  md:justify-evenly md:items-start'>
          <WhyJapanese image={career} text="Widen your career prospects " />
          <WhyJapanese image={japaneseCulture} text="Get Closer to Japan's rich and unique culture" />
          <WhyJapanese image={music} text="Enjoy Japanese media firsthand" />
        </div>
      </div>

    </div>




  )

}

export default OverView


