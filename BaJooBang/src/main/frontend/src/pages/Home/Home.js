import React, { useState, useEffect } from 'react';
import './Home.css'; 
import { ReactComponent as Arrow } from '../../components/images/arrow.svg';
import video from '../../components/images/background.mp4';

function Homepage() {
  const messages = ["뿅1", "뿅2"];
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex(prevIndex => (prevIndex + 1) % messages.length);
    }, 4000); // 8초마다 메시지 변경

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="Homepage">
       <video autoPlay loop muted>
           <source src={video} type='video/mp4' />
       </video>
    <div className='content'>
      <div className='threejs'></div>
      
      <div className="center-text">
        <h1 className="fade-in">타이틀</h1>
        <p className="fade-in description">서브타이틀</p>
      </div>

      <div className="scroll-arrow"><Arrow/></div>
      <p className="message fade-in-out">{messages[messageIndex]}</p>
    </div>
    </div>
  );
}

export default Homepage;
