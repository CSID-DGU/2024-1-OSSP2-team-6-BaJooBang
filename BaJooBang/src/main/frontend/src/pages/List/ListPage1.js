import React, { useState, useEffect } from 'react';
import './ListPage1.css';
import ListBlock from './ListBlock1';
import Modal from './Modal';
import axios from 'axios';

function ListPage1() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const [listData, setListData] = useState([]);
    const itemsPerPage = 10;

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/member/inquiry'); // Replace with your actual API endpoint
                const requestData = response.data.list.map((item, index) => ({
                    Num: index + 1,
                    Address: item.address,
                    Person: item.name,
                    Star: item.star,
                    Message: item.message,
                    Worker_id: item.worker_id,
                    Request_id: item.request_id,
                }));
                setListData(requestData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

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
                   <div className='ListTitleText_num' style={{fontWeight: '600'}}>번호</div> 
                   <div className='ListTitleText_address' style={{fontWeight: '600'}}>주소</div>
                   <div className='ListTitleText_person' style={{fontWeight: '600'}}>발품인</div>
                   <div className='ListTitleText_star' style={{fontWeight: '600'}}>별점</div>
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
            <Modal 
                isOpen={isModalOpen}
                onClose={closeModal}
                data={modalData}
                Worker_id={modalData?.Worker_id} 
                Request_id={modalData?.Request_id}
            />
        </div>
    )
}

export default ListPage1;
