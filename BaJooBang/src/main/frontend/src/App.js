import React from 'react';
import {  Routes, Route, Router } from 'react-router-dom';
import HeaderBar from './components/header/HeaderBar';
import { AuthProvider } from './AuthContext';
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
import ListPage1 from './pages/List/ListPage1';
import ListPage2 from './pages/List/ListPage2';
import ListPage3 from './pages/List/ListPage3';
import ListPage4 from './pages/List/ListPage4';
import ListPage5 from './pages/List/ListPage5';
import Matching from './pages/Matching/Matching';
import Homepage from './pages/Home/Home';
import "./fonts/fonts.css";

function App() {
  return (
    <AuthProvider>
      <div>
        <HeaderBar />
        <Routes>
        <Route path="/" element={<Homepage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/helpmap" element={<HelpMap />} />
          <Route path="/domap" element={<DoMap/>} />
          <Route path='/helpinfo/:house_id' element={<Imformation positions={positions} />}></Route>
          <Route path="/request/:id" element={<RequestForm />} />
          {/* <Route path="/request" element={<RequestForm />} /> */}
          {/* <Route path="/request" element={<RequestForm />} /> */}
          <Route path='/member' element={<MyPage />} />
          <Route path='/member/inquiry' element={<ListPage1 />} />
          <Route path='/member/registered' element={<ListPage2 />} />
          <Route path='/member/alarm' element={<ListPage3 />} />
          <Route path='/member/footwork' element={<ListPage4 />} />
          <Route path='/member/heart' element={<ListPage5 />} />
          <Route path='/matching' element={<Matching />} />
      </Routes>
      </div>
    </AuthProvider>
      
    
  );
}

export default App;

