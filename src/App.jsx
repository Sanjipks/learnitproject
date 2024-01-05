import {
  BrowserRouter as Router,
  Route,
  Routes,

} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import BrowseProducts from "./pages/BrowseProducts";
import Home from "./pages/Home";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState('light');
  const [text, setText] = useState ('Turn Dark Mode')

  const handleToggle = () =>{
    console.log('clicked')

    if(mode === 'dark'){
      setMode('light')
      setText ('Turn Dark Mode')
    }
    else{
      setMode('dark')
      setText ('Turn Light Mode')
    }
  }



  return (
   
      <Router>
        <Navbar mode = {mode} handleToggle = {handleToggle} text = {text}/>
        <div>
        <Routes>
          <Route path ="/" element={<Home mode = {mode} handleToggle = {handleToggle} text = {text}/>}/>
          <Route path ="/services" element={<BrowseProducts/>}/>
          <Route path ="/about" element={<About/>}/>
        </Routes>
        </div>
     
      </Router>
      
   
  );
}

export default App;
