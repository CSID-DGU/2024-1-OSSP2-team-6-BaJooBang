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
import RequestForm from './pages/RequestForm/RequestForm';
import MyPage from './pages/MyPage/Mypage';

function App() {
  return (
    
      <div>
        <HeaderBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/helpmap" element={<HelpMap />} />
          <Route path="/domap" element={<DoMap/>} />
          <Route path='/helpinfo/:house_id' element={<Imformation positions={positions} />}></Route>
          <Route path="/request/:house_id" element={<RequestForm />} />
          <Route path='/mypage' element={<MyPage />} />
      </Routes>
      </div>
    
  );
}

export default App;

