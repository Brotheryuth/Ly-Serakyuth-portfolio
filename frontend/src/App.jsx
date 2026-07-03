import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './page/Login/Login';
import Dashboard from './page/Dashboard/Dashboard';
import Notfound from './page/NotFound/Notfound';
import Home from './page/Home/Home';

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
      <Routes>
        {/* public route */}
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='dashboard' 
          element={
            <ProtectRoute> 
              <Dashboard/>
            </ProtectRoute>}/>
        <Route path="*" element={<Notfound/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App