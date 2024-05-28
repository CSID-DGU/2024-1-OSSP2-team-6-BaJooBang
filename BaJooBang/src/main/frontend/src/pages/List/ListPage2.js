import React, { useState, useEffect } from 'react';
import './ListPage1.css'; // 페이지 스타일을 여기에 유지합니다.
import ListBlock2 from './ListBlock2';
import { Link } from 'react-router-dom';

function ListPage2() {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const itemsPerPage = 10;

    const listData = [
        { Num: '1', Address: '서울특별시 서초구 서초동', month: '2000/130', date: '2024.03.29', request: '0', state: '요청 중' },
        { Num: '2', Address: '서울특별시 강남구 역삼동', month: '1000/50', date: '2024.03.28', request: '1', state: '요청 중' },
        { Num: '3', Address: '서울특별시 강동구 천호동', month: '100/23', date: '2024.03.24', request: '4', state: '매칭 완료' },
        { Num: '4', Address: '서울특별시 강서구 화곡동', month: '2000/130', date: '2024.03.22', request: '2', state: '요청 중' },
        { Num: '5', Address: '서울특별시 마포구 합정동', month: '300/30', date: '2024.03.21', request: '3', state: '매칭 완료' },
        { Num: '6', Address: '서울특별시 용산구 이태원동', month: '100/10', date: '2024.03.20', request: '1', state: '요청 중' },
        { Num: '7', Address: '서울특별시 성동구 성수동', month: '500/50', date: '2024.03.19', request: '0', state: '요청 중' },
        { Num: '8', Address: '서울특별시 종로구 혜화동', month: '400/40', date: '2024.03.18', request: '2', state: '매칭 완료' },
        { Num: '9', Address: '서울특별시 서대문구 홍제동', month: '700/70', date: '2024.03.17', request: '4', state: '요청 중' },
        { Num: '10', Address: '서울특별시 동작구 상도동', month: '1000/100', date: '2024.03.16', request: '3', state: '요청 중' },
        { Num: '11', Address: '서울특별시 송파구 잠실동', month: '200/20', date: '2024.03.15', request: '2', state: '매칭 완료' },
        { Num: '12', Address: '서울특별시 강남구 청담동', month: '1500/150', date: '2024.03.14', request: '1', state: '요청 중' },
        { Num: '13', Address: '서울특별시 영등포구 여의도동', month: '2500/250', date: '2024.03.13', request: '0', state: '요청 중' },
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
                   <div className='ListTitleText2'>상태</div>
                   <div className='ListTitleText2'>요청서</div>
                   <div className='ListTitleText2'>등록일</div>
                </div>
                {currentItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <Link to='/matching' className='ListLinkNotLine'>
                            <ListBlock2 Num={item.Num} Address={item.Address} month={item.month} date={item.date} request={item.request} state={item.state} />
                        </Link>
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

export default ListPage2;
