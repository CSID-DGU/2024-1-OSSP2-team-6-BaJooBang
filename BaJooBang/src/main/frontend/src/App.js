import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderBar from './components/header/HeaderBar';
import Home from './pages/Home/Home';
// import MyPage from './MyPage';
import Login from './pages/Login/LoginPage';
import SignUp from './pages/Login/SignUpPage';
import HelpMap from './HelpPage/helpmap';

function App() {
  return (
    <Router>
      <div>
        <HeaderBar />
        <Routes>
          <Route path='/home' element={<Home />} />
          {/* <Route path="/mypage" element={<MyPage />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/helpmap" element={<HelpMap />} />
          <Route path="/domap" element={<div>Do Map Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

