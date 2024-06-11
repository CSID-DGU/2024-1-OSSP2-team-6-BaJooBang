import React, { useState, useEffect } from 'react';
import './ListPage1.css';
import ListBlock from './ListBlock5';
import axios from 'axios';

function ListPage5() {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const [listData, setListData] = useState([]);
    const itemsPerPage = 10;

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get('/member/like');
                const requestData = response.data.map((item, index) => ({
                    Num: index + 1,
                    Address: item.address,
                    Month: item.month_price,
                    house_id: item.house_id
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
                <div className='ListTitle' style={{backgroundColor: 'rgba(162, 197, 121, 0.3)'}}>
                    <div className='ListTitleText_num'>번호</div> 
                    <div className='ListTitleText_address'>주소</div>
                    <div className='ListTitleText_person'>월세</div>
                    <div className='ListTitleText_star'>매물</div>
                </div>
                {currentItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListBlock 
                            Num={item.Num} 
                            Address={item.Address}
                            Month={item.Month}
                            house_id={item.house_id}
                        />
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

export default ListPage5;
