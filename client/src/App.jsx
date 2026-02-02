import './App.css'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Kanji from './pages/Kanji.jsx'
import Vocabulary from './pages/Vocabulary.jsx'
import Progress from './pages/Progress.jsx'
import ReportBug from './pages/ReportBug.jsx'
import Signup from './pages/Signup.jsx'
import Signin from './pages/Signin.jsx'
import OverView from './pages/OverView.jsx'


function App() {

  return (
  
      <BrowserRouter>
       <Routes>
         <Route path = '/' element = {<OverView/>} />
         <Route path = '/home' element = {<Home/>} />
         <Route path = '/kanji' element = {<Kanji/>} /> 
         <Route path = '/vocabulary' element = {<Vocabulary/>} />
         <Route path = '/progress' element = {<Progress/>} /> 
         <Route path = '/report' element = {<ReportBug/>} />
         <Route path = '/signup' element = {<Signup/>} />
         <Route path = '/signin' element = {<Signin/>} />
       </Routes>
    </BrowserRouter>  

  )
}

export default App;
