import './App.css';
import Login from './assets/components/loginview/login';
import Register from './assets/components/register/registerview';
import Navbars from './assets/components/navbar/navbar';
import Home from './assets/components/home/homebody';
import Footer from './assets/components/footer/footer';
import Cart from './assets/components/cart/Cart';
import Users from './assets/pages/users/users';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/styles/GenericStyle.css';
import Forgotpass from './assets/components/forgot/Forgot';
import Stripe from './assets/components/stripe/Stripe';
function App() {
  return (
    <BrowserRouter>
      <Navbars />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/users" element={<Users />} />
        <Route path="/forgot" element={<Forgotpass />} />
        <Route path="/stripe/:cid" element={<Stripe />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
