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
import ListPage1 from './pages/List/ListPage1';
import ListPage2 from './pages/List/ListPage2';
import ListPage3 from './pages/List/ListPage3';
import ListPage4 from './pages/List/ListPage4';
import Matching from './pages/Matching/Matching';
import Homepage from './pages/Home/Home';
import "./fonts/fonts.css";

function App() {
  return (
    
      <div>
        <HeaderBar />
        <Routes>
        <Route path="/" element={<Homepage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/helpmap" element={<HelpMap />} />
          <Route path="/domap" element={<DoMap/>} />
          <Route path='/helpinfo/:house_id' element={<Imformation positions={positions} />}></Route>
          <Route path="/request/:house_id" element={<RequestForm />} />
          {/* <Route path="/request" element={<RequestForm />} /> */}
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/list1' element={<ListPage1 />} />
          <Route path='/list2' element={<ListPage2 />} />
          <Route path='/list3' element={<ListPage3 />} />
          <Route path='/list4' element={<ListPage4 />} />
          <Route path='/matching' element={<Matching />} />
      </Routes>
      </div>
    
  );
}

export default App;

