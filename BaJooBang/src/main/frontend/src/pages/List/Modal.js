import React from 'react';
import './Modal.css';
import {ReactComponent as Profile2} from '../../components/images/profile2.svg';
import {ReactComponent as Message} from '../../components/images/message.svg';

function Modal({ isOpen, onClose, data }) {
    if (!isOpen) return null;

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
                        <p style={{fontSize: '16px', fontWeight: '500'}}>안녕하세요 발품 요청인 홍길동입니다. 발품 신청합니다.</p>
                    </div>
                    <div className='modalButtonBox'>
                        <div/>
                        <div className='modalButton'>
                            요청 거부
                        </div>
                        <div className='modalButton' style={{backgroundColor: 'rgba(210, 222, 50, 0.4)'}}>
                            요청 승인
                        </div>
                        <div/>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Modal;
