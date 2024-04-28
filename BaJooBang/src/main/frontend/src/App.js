import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import HeaderBar from './components/header/HeaderBar';
//import Home from './pages/Home/Home';
// import MyPage from './MyPage';
import { positions } from './HelpPage/kakaomap';
import Login from './pages/Login/LoginPage';
import SignUp from './pages/Login/SignUpPage';
import HelpMap from './HelpPage/helpmap';
import DoMap from './DoPage/domap';
import Imformation from "./HelpPage/helpinfo";
import Request from './pages/RequestForm/RequestForm';

function App() {
  return (
    
      <div>
        <HeaderBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/helpmap" element={<HelpMap />} />
          <Route path="/domap" element={<DoMap/>} />
          <Route path='/helpinfo/:id' element={<Imformation positions={positions} />}></Route>
          <Route path="/request" element={<Request/>} />
      </Routes>
      </div>
    
  );
}

export default App;

