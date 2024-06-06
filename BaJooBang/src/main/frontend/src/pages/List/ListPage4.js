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

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/member/footwork'); // Replace with your actual API endpoint
                const requestData = response.data.map((item, index) => ({
                    Num: index + 1,
                    Address: item.address,
                    Price: item.price,
                    State: item.state || 'N/A', // null 값을 'N/A'로 변환
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

    return (
        <div className='ListBackground'>
            <div className='ListBox'>
                <div className='ListTitle' style={{ backgroundColor: 'rgba(162, 197, 121, 0.3)' }}>
                    <div className='ListTitleText2'>번호</div>
                    <div className='ListTitleText_address' style={{ fontWeight: '600' }}>매물 주소</div>
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
    );
}

export default ListPage4;
