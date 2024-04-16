import React from 'react';
import './helpmap.css';
import MypageMap from './kakaomap';



// 매물지도의 검색라인
const SearchBar = () => {
  return (
    <div className="search">
      <label htmlFor="searchfor">매물검색 |</label>
      <input type="text" placeholder="매물을 검색하세요" />
      <div className="house_type_buttons">
        월세/전세  |
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
