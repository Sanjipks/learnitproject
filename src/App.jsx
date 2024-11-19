import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./pages/common/About";
import UserList from "./pages/admin/userlist/UsersList";
import Login from "./pages/common/Login";
import Register from "./pages/common/RegisterPage";
import Footer from "./components/Footer";
import Auth from "./pages/common/Auth";
import ForgetPassword from "./pages/common/ForgetPassword";
import Home from "./pages/user/Home";
import LoginProvider from "./context/LoginContext";
import AdminPage from "./pages/admin/AdminPage";
import VerifyAccount from "./pages/common/VerifyAccount";
import ResetForgetPassword from "./pages/common/ResetForgetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Services from "./pages/common/Services";
import ContactUs from "./pages/common/ContactUs";
import LearnerPortal from "./pages/user/LeanerPortal";
import MyCart from "./pages/user/MyCart";
import CartProvider from "./context/CartContext";
import CheckOutPage from "./pages/user/CheckOutPage";
import PaymentForm from "./pages/user/Payment";
import UserCircle from "./pages/user/UserCircle";

function App() {
  return (
    <Router>
      <LoginProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verifyaccount" element={<VerifyAccount />} />
            {/* <Route path="/userprofile" element={<UserProfile />} /> */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/user/learner-portal" element={<LearnerPortal />} />
            <Route path="/user/user-circle" element={<UserCircle />} />
            <Route path="/mycart" element={<MyCart />} />
            <Route path="/checkout" element={<CheckOutPage />} />
            <Route path="/paymentform" element={<PaymentForm />} />
            <Route
              path="/reset-forgot-password"
              element={<ResetForgetPassword />}
            />
          </Routes>
          <Footer />
          <ToastContainer />
        </CartProvider>
      </LoginProvider>
    </Router>
  );
}

export default App;
