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


function App() {


  return (
   
      <Router>
        <Navbar />
        <div>
        <Routes>
          <Route path ="/" element={<Home />}/>
          <Route path ="/services" element={<BrowseProducts/>}/>
          <Route path ="/about" element={<About/>}/>
        </Routes>
        </div>
     
      </Router>
      
   
  );
}

export default App;
