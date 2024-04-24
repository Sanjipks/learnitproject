import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import UserList from "./pages/UserList";
import Login from "./pages/Login";
import Register from "./pages/RegisterPage";
import UserProfile from "./pages/UserProfile";
import Footer from "./components/Footer";
import Auth from "./pages/Auth";
import ForgetPassword from "./pages/ForgetPassword";
import Home from "./pages/Home";
import LoginProvider from "./context/LoginContext";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Router>
      <LoginProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </LoginProvider>
      <Footer />
    </Router>
  );
}

export default App;
