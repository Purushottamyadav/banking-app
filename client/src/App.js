import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../src/components/login/Login';
import Home from '../src/components/home/Home'
import Register from '../src/components/register/Register'
import Bank from './components/bank/Bank';
function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/bank" element={<Bank />} />
      </Routes>
    </BrowserRouter> 
    </>
  );
}

export default App;
