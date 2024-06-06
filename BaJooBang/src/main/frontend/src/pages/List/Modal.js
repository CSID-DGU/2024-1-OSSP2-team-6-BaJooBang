import React from 'react';
import './Modal.css';
import {ReactComponent as Profile2} from '../../components/images/profile2.svg';
import {ReactComponent as Message} from '../../components/images/message.svg';
import axios from 'axios';

function Modal({ isOpen, onClose, data, Worker_id, Request_id }) {
    if (!isOpen) return null;

    // Fetch data from the API
    const fetchData = async () => {
        try {
            const response = await axios.patch('http://localhost:8000/member/inquiry/accept', {
                request_id: Request_id,
                worker_id: Worker_id,
            }); // Replace with your actual API endpoint
            console.log('Response:', response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className='modal'>
            <div className='modal-content'>
                <span className='close' onClick={onClose}>&times;</span>
                <h2>발품인 정보</h2>
                <div style={{display: "flex", flexDirection:"column", alignItems: 'center', paddingTop: '2vw'}}>
                    <Profile2 />
                    <p style={{fontSize: "25px"}}>{data.Person}</p>
                    <p style={{marginTop: "-10px"}}>{data.Star}</p>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: 'center', alignItems: 'center', paddingTop: '2vw', paddingBottom: '2vw'}}>
                        <Message style={{paddingRight: "0.5vw"}}/>
                        <p style={{fontSize: '16px', fontWeight: '500'}}>{data.Message}</p>
                    </div>
                    <div className='modalButtonBox'>
                        <div/>
                        <div className='modalButton'>
                            요청 거부
                        </div>
                        <div className='modalButton' style={{backgroundColor: 'rgba(210, 222, 50, 0.4)'}} onClick={fetchData}>
                            요청 수락
                        </div>
                        <div/>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Modal;
