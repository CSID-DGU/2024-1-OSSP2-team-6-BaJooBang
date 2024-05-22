import React, { useState, useEffect } from 'react';
import './ListPage1.css';
import ListBlock from './ListBlock1';
import Modal from './Modal';

function ListPage1() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const itemsPerPage = 10;

    const listData = [
        { Num: '1', Address: '서울특별시 서초구 서초동', Person: '홍길동', Star: '4.8' },
        { Num: '2', Address: '서울특별시 강남구 역삼동', Person: '이순신', Star: '4.9' },
        { Num: '3', Address: '서울특별시 강동구 천호동', Person: '장보고', Star: '4.7' },
        { Num: '4', Address: '서울특별시 강서구 화곡동', Person: '유관순', Star: '4.6' },
        { Num: '5', Address: '서울특별시 마포구 합정동', Person: '안중근', Star: '4.5' },
        { Num: '6', Address: '서울특별시 용산구 이태원동', Person: '김구', Star: '4.4' },
        { Num: '7', Address: '서울특별시 성동구 성수동', Person: '김좌진', Star: '4.3' },
        { Num: '8', Address: '서울특별시 종로구 혜화동', Person: '윤봉길', Star: '4.2' },
        { Num: '9', Address: '서울특별시 강서구 화곡동', Person: '유관순', Star: '4.6' },
        { Num: '10', Address: '서울특별시 마포구 합정동', Person: '안중근', Star: '4.5' },
        { Num: '11', Address: '서울특별시 용산구 이태원동', Person: '김구', Star: '4.4' },
        { Num: '12', Address: '서울특별시 성동구 성수동', Person: '김좌진', Star: '4.3' },
        { Num: '13', Address: '서울특별시 종로구 혜화동', Person: '윤봉길', Star: '4.2' },
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
    }, [currentPage, listData]);

    // Change page
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
                   <div className='ListTitleText_num'>번호</div> 
                   <div className='ListTitleText_address'>주소</div>
                   <div className='ListTitleText_person'>발품인</div>
                   <div className='ListTitleText_star'>별점</div>
                </div>
                {currentItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListBlock 
                            Num={item.Num} 
                            Address={item.Address} 
                            Person={item.Person} 
                            Star={item.Star} 
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
    )
}

export default ListPage1;
