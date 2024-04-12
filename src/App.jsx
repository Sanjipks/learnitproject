import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import UserList from "./pages/UserList";
import Home from "./pages/Home";
import Register from "./pages/RegisterPage";
import UserProfile from "./pages/UserProfile";
import Footer from "./components/Footer";
import Auth from "./pages/VerifyAccount";
import ForgetPassword from "./pages/ForgetPassword";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
