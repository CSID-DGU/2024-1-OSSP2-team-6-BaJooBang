import React from 'react';
import './domap.css';
import DopageMap from './showmap';



// 매물지도의 검색라인
const SearchBar = () => {
  return (
    <div className="search">
      <label htmlFor="searchfor">매물검색 |</label>
      <input type="text" placeholder="매물을 검색하세요" />
    </div>
  );
};

const Dopage = () => {
  return (
    <div className='screen'>
      <SearchBar />
      <DopageMap/>
    </div>
  );
};

export default Dopage;
