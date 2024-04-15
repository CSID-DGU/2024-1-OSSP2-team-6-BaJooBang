import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // 전역 스타일을 위한 CSS 파일
import App from './App'; // App 컴포넌트 임포트
import reportWebVitals from './reportWebVitals'; // 성능 측정을 위한 추가 스크립트 (선택적)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// 웹 바이탈스를 리포트하는 선택적 기능, 성능 측정을 위해 사용
reportWebVitals();
