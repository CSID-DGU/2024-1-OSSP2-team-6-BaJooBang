import React, { useState, useEffect } from 'react';
import './helpmap.css';
import MypageMap from './kakaomap';
import { ReactComponent as Closer } from '../components/images/closer.svg';

// 매물지도의 검색라인
const SearchBar = ({ onFilterChange }) => {
  return (
    <div className="search">
      <label htmlFor="searchfor">매물 검색<span className='blank'></span>|</label><span className='blank'></span>
      <div className='searchbox'><Closer /><input type="text" placeholder="매물을 검색하세요" /></div>
      <div className="house_type_buttons">
        <span className='blank'></span>월세/전세<span className='blank'></span>|<span className='blank'></span>
        <button onClick={() => onFilterChange('월세')}>월세</button>
        <button onClick={() => onFilterChange('전세')}>전세</button>
        <button onClick={() => onFilterChange('전체')}>전체</button>
      </div>
    </div>
  );
};

const Helppage = () => {
  const [filter, setFilter] = useState('전체');
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div>
      <SearchBar onFilterChange={handleFilterChange} />
      <MypageMap filter={filter} />
    </div>
  );
};

export default Helppage;
