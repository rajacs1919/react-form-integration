import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css'
import FirstPage from './FirstPage'
import SecondPage from './SecondPage';
import Formvalidation from './Formvalidation'
import API_From from './API_From'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/FirstPage" element={<FirstPage />} />
            <Route path="/second" element={<SecondPage />} />
            <Route path='/Formvalidation' element={<Formvalidation/>}/>
            <Route path='/API_From' element={<API_From/>}/>
          </Routes>

        </BrowserRouter>
      </div>
    </>
  )
}

export default App
