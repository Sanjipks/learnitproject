import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({mode, handleToggle, text}) {

const [expand, setExpand] = useState('hidden')
 
const handleExpandMenu = () =>{
  if (expand === 'hidden'){
    setExpand('flex')
  }
  else{
    setExpand('hidden')
  }
}

  return (
   

<nav className={`bg-white border-gray-200 ${mode==='dark'?'dark:bg-gray-900':'dark:bg-gray-300'}`}>
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
        {/* <img src="" className="h-8" alt="LearnIT Logo" /> */}
        <span className={`self-center text-2xl font-semibold whitespace-nowrap ${mode==='dark'?'dark:text-white':'dark:text-black'}`}>LEarnIT</span>
    </a>
    <label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer" onClick={handleToggle}/>
  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span className={`ms-3 text-sm font-medium text-gray-900 ${mode==='dark'?'dark:text-white':'dark:text-black'}`} >{text}</span>
</label>
    <button onClick = {handleExpandMenu} data-collapse-toggle="navbar-default" type="button" 
    className= 'inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-500 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false"'>
         <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="false" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
   
    <div className= {`${expand} w-full md:block md:w-auto" id="navbar-default `}>
   
      <ul className= 'font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 '>
        <li>
          <Link to="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</Link>
        </li>
        <li>
          <Link to="/about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</Link>
        </li>
        <li>
          <Link to="/services" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</Link>
        </li>
        
      </ul>
    </div>

  </div>
</nav>

  )
}
