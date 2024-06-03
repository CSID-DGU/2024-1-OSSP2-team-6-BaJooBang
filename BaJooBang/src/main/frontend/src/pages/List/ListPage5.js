import React, { useState, useEffect } from 'react';
import './ListPage1.css';
import ListBlock from './ListBlock5';
import Modal from './Modal';
import axios from 'axios';

function ListPage5() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    // const [listData, setListData] = useState([]);
    const itemsPerPage = 10;

    const listData = [
        { Num: '1', Address: '서울특별시 서초구 서초동', Month: '01/12' },
        { Num: '2', Address: '서울특별시 강남구 역삼동', Month: '02/12' },
        { Num: '3', Address: '서울특별시 강동구 천호동', Month: '03/12' },
        { Num: '4', Address: '서울특별시 강서구 화곡동', Month: '04/12' },
        { Num: '5', Address: '서울특별시 마포구 합정동', Month: '05/12' },
        { Num: '6', Address: '서울특별시 용산구 이태원동', Month: '06/12' },
        { Num: '7', Address: '서울특별시 성동구 성수동', Month: '07/12' },
        { Num: '8', Address: '서울특별시 종로구 혜화동', Month: '08/12' },
        { Num: '9', Address: '서울특별시 강서구 화곡동', Month: '09/12' },
        { Num: '10', Address: '서울특별시 마포구 합정동', Month: '10/12' },
        { Num: '11', Address: '서울특별시 용산구 이태원동', Month: '11/12' },
        { Num: '12', Address: '서울특별시 성동구 성수동', Month: '12/12' },
        { Num: '13', Address: '서울특별시 종로구 혜화동', Month: '13/12' }
    ];

    const handleBlockClick = (data) => {
        setModalData(data);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalData(null);
    };

    // Update current items when currentPage changes
    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setCurrentItems(listData.slice(indexOfFirstItem, indexOfLastItem));
    }, [currentPage]);

    // Change page
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
                            onClick={() => handleBlockClick(item)}
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
            <Modal isOpen={isModalOpen} onClose={closeModal} data={modalData} />
        </div>
    );
}

export default ListPage5;
