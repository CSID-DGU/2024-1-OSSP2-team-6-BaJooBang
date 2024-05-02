import React from 'react';
import './domap.css';
import DopageMap from './showmap';
import { ReactComponent as Closer } from '../components/images/closer.svg';



// 매물지도의 검색라인
const SearchBar = () => {
  return (
    <div className="search">
      <label htmlFor="searchfor">매물 검색<span className='blank'></span>|</label><span className='blank'></span>
      <div className='searchbox'><Closer/><input type="text" placeholder="매물을 검색하세요" /></div>
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
