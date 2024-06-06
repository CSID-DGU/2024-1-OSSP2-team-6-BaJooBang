import React, { useState, useEffect } from 'react';
import './ListPage1.css'; // 페이지 스타일을 여기에 유지합니다.
import ListBlock4 from './ListBlock4';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ListPage4() {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const [listData, setListData] = useState([]);
    const itemsPerPage = 10;

    /*
    const listData = [
        { Num: '1', Address: '서울특별시 서초구 서초동', month: '10000원', date: '2024.03.29', state: '요청 중' },
        { Num: '2', Address: '서울특별시 강남구 역삼동', month: '10000원', date: '2024.03.28', state: '요청 중' },
        { Num: '3', Address: '서울특별시 강동구 천호동', month: '10000원', date: '2024.03.24', state: '매칭 완료' },
        { Num: '4', Address: '서울특별시 강서구 화곡동', month: '10000원', date: '2024.03.22', state: '요청 중' },
        { Num: '5', Address: '서울특별시 마포구 합정동', month: '10000원', date: '2024.03.21', state: '매칭 완료' },
        { Num: '6', Address: '서울특별시 용산구 이태원동', month: '10000원', date: '2024.03.20', state: '요청 중' },
        { Num: '7', Address: '서울특별시 성동구 성수동', month: '10000원', date: '2024.03.19', state: '요청 중' },
        { Num: '8', Address: '서울특별시 종로구 혜화동', month: '10000원', date: '2024.03.18', state: '작성 완료' },
        { Num: '9', Address: '서울특별시 서대문구 홍제동', month: '10000원', date: '2024.03.17', state: '요청 중' },
        { Num: '10', Address: '서울특별시 동작구 상도동', month: '10000원', date: '2024.03.16', state: '요청 중' },
        { Num: '11', Address: '서울특별시 송파구 잠실동', month: '10000원', date: '2024.03.15', state: '매칭 완료' },
        { Num: '12', Address: '서울특별시 강남구 청담동', month: '10000원', date: '2024.03.14', state: '요청 중' },
        { Num: '13', Address: '서울특별시 영등포구 여의도동', month: '10000원', date: '2024.03.13', state: '요청 중' },
    ];
    */
    
    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/member/footwork'); // Replace with your actual API endpoint
                const requestData = response.data.list.map((item, index) => ({
                    Num: index + 1,
                    Address: item.address,
                    Price: item.price,
                    State: item.state,
                    Date: item.date,
                    Request_id: item.request_id,
                }));
                setListData(requestData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

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
                   <div className='ListTitleText_address' style={{fontWeight: '600'}}>매물 주소</div>
                   <div className='ListTitleText2'>거래 가격</div>
                   <div className='ListTitleText2'>상태</div>
                   <div className='ListTitleText2'>요청서</div>
                   <div className='ListTitleText2'>등록일</div>
                </div>
                {currentItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <Link to='/matching' className='ListLinkNotLine'>
                            <ListBlock4 Num={item.Num} Address={item.Address} Price={item.Price} Date={item.Date} Request_id={item.Request_id} State={item.State} />
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

export default ListPage4;
