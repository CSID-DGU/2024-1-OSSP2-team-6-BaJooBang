import React, { useState, useEffect } from 'react';
import './ListPage1.css'; // 페이지 스타일을 여기에 유지합니다.
import ListBlock3 from './ListBlock3';
import { Link } from 'react-router-dom';

function ListPage3() {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const itemsPerPage = 10;

    const listData = [
        { Num: '1', Address: '서울특별시 서초구 서초동', month: '10,000원', date: '손흥민', request: '요청서 보기', state: '2024.03.29' },
        { Num: '2', Address: '서울특별시 강남구 역삼동', month: '20,000원', date: '김연아', request: '요청서 보기', state: '2024.03.28' },
        { Num: '3', Address: '서울특별시 강동구 천호동', month: '15,000원', date: '박지성', request: '요청서 보기', state: '2024.03.27' },
        { Num: '4', Address: '서울특별시 강서구 화곡동', month: '12,000원', date: '이강인', request: '요청서 보기', state: '2024.03.26' },
        { Num: '5', Address: '서울특별시 마포구 합정동', month: '30,000원', date: '김연경', request: '요청서 보기', state: '2024.03.25' },
        { Num: '6', Address: '서울특별시 용산구 이태원동', month: '8,000원', date: '류현진', request: '요청서 보기', state: '2024.03.24' },
        { Num: '7', Address: '서울특별시 성동구 성수동', month: '14,000원', date: '추신수', request: '요청서 보기', state: '2024.03.23' },
        { Num: '8', Address: '서울특별시 종로구 혜화동', month: '18,000원', date: '황희찬', request: '요청서 보기', state: '2024.03.22' },
        { Num: '9', Address: '서울특별시 서대문구 홍제동', month: '25,000원', date: '손흥민', request: '요청서 보기', state: '2024.03.21' },
        { Num: '10', Address: '서울특별시 동작구 상도동', month: '22,000원', date: '박지성', request: '요청서 보기', state: '2024.03.20' },
        { Num: '11', Address: '서울특별시 송파구 잠실동', month: '19,000원', date: '김연아', request: '요청서 보기', state: '2024.03.19' },
        { Num: '12', Address: '서울특별시 강남구 청담동', month: '17,000원', date: '김연경', request: '요청서 보기', state: '2024.03.18' },
        { Num: '13', Address: '서울특별시 영등포구 여의도동', month: '16,000원', date: '류현진', request: '요청서 보기', state: '2024.03.17' },
        { Num: '14', Address: '서울특별시 광진구 화양동', month: '23,000원', date: '이강인', request: '요청서 보기', state: '2024.03.16' },
    ];
    

    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setCurrentItems(listData.slice(indexOfFirstItem, indexOfLastItem));
    }, [currentPage, listData]);

    const paginate = (pageNumber, event) => {
        event.preventDefault();
        setCurrentPage(pageNumber);
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(listData.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <div className='ListBackground'>
            <div className='ListBox'>
                <div className='ListTitle' style={{backgroundColor: 'rgba(162, 197, 121, 0.3)'}}>
                   <div className='ListTitleText2'>번호</div> 
                   <div className='ListTitleText2_address'>매물 주소</div>
                   <div className='ListTitleText2'>거래 가격</div>
                   <div className='ListTitleText2'>요청인</div>
                   <div className='ListTitleText2'>요청서</div>
                   <div className='ListTitleText2'>요청일</div>
                </div>
                {currentItems.map((item, index) => (
                    <React.Fragment key={index}>
                        
                            <ListBlock3 Num={item.Num} Address={item.Address} month={item.month} date={item.date} request={item.request} state={item.state} />
                        
                        <div className='ListLine' />
                    </React.Fragment>
                ))}
            </div>
            <nav>
                <ul className='pagination'>
                    {pageNumbers.map(number => (
                        <li key={number} className='page-item'>
                            <a onClick={(event) => paginate(number, event)} href='!#' className='page-link'>
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default ListPage3;
