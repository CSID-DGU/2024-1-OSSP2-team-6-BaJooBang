import React from 'react';
import './helpmap.css';
import MypageMap from './kakaomap';
import { ReactComponent as Closer } from '../components/images/closer.svg';


// 매물지도의 검색라인
const SearchBar = () => {
  return (
    <div className="search">
      <label htmlFor="searchfor">매물 검색<span className='blank'></span>|</label><span className='blank'></span>
      <div className='searchbox'><Closer/><input type="text" placeholder="매물을 검색하세요" /></div>
      <div className="house_type_buttons">
      <span className='blank'></span>월세/전세<span className='blank'></span>|<span className='blank'></span>
        <button>월세</button>
        <button>전세</button>
        <button>전체</button>
      </div>
    </div>
  );
};

const Helppage = () => {
  return (
    <div>
      <SearchBar />
      <MypageMap/>
    </div>
  );
};

export default Helppage;
