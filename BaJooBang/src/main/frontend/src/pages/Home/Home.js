import React, { useState, useEffect } from 'react';
import './Home.css'; 
import { ReactComponent as Arrow } from '../../components/images/arrow.svg';
import video from '../../components/images/background.mp4';
import video2 from '../../components/images/moving_people.mp4';
import video3 from '../../components/images/moving_house.mp4';

function Homepage() {
  return (
    <div className="Homepage">
      <video id ="video1" autoPlay loop muted >
        <source  src={video} type='video/mp4' />
      </video>
      <div className='content'>
        
        <div className="center-text">
          <h1 className="fade-in">더 빠르고 편리한 발품을 위해</h1>
          <p className="fade-in description">바줘방은 서울 지역 자취방을 알아보기 위해 돈과 시간을 투자해야하는 이들에게, <p>돈과 시간을 절약해주기위한 효윈적인 대리 발품인을 제공합니다.  </p></p>
        </div>

        <div className="scroll-arrow"><Arrow/></div>

        <div className='reason'>
          <p className='reaseon_title'>why use?</p>
          <h1> 누구나 언제든 발품을 팔 수 있다!!</h1>
        </div>
        <div className="row-container">
    <div className="video-row">
      <video id="video2" autoPlay loop muted>
        <source src={video2} type='video/mp4' />
      </video>
      <video id="video3" autoPlay loop muted>
        <source src={video3} type='video/mp4' />
      </video>
    </div>
    <div className='three_reason'>
      <h2 className='part'>누구나 집을 알아볼 수 있도록</h2>
      <h2 className='part'>언제나 집을 알아볼 수 있도록</h2>
      <h2 className='part'>어디서든  집을 알아볼 수 있도록</h2>
    </div>
  </div>

      
      
      </div>


      
    </div>
    
  );
}

export default Homepage;
