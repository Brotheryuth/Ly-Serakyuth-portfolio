import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound';
import Home from './pages/Home/Home';
import Skills from './pages/Skills/Skills';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
// just a helper to check for jwt token before access to unathorized page 
const ProtectRoute = ({children})=>{
  const token = localStorage.getItem('token');
  if(!token){
    return <Navigate to="/login" replace  />;
  }
  return children;
};

function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        {/* public route */}
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/projects' element={<Projects/>} />
        <Route path='/skills' element={<Skills/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='dashboard' 
          element={
            <ProtectRoute> 
              <Dashboard/>
            </ProtectRoute>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer />
    </Router>
    </>
  )
}

export default App