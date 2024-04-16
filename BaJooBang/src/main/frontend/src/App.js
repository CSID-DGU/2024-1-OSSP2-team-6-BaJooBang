import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import HeaderBar from './components/header/HeaderBar';
//import Home from './pages/Home/Home';
// import MyPage from './MyPage';
import { positions } from './HelpPage/kakaomap';
import Login from './pages/Login/LoginPage';
import SignUp from './pages/Login/SignUpPage';
import HelpMap from './HelpPage/helpmap';
import Imformation from "./HelpPage/helpinfo";

function App() {
  return (
    
      <div>
        <HeaderBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/helpmap" element={<HelpMap />} />
          <Route path="/domap" element={<div>Do Map Page</div>} />
          <Route path='/helpinfo/:id' element={<Imformation positions={positions} />}></Route>
      </Routes>
      </div>
    
  );
}

export default App;

