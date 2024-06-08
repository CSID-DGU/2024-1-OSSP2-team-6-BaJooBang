import React from 'react';
import './ListPage1.css';
import { useNavigate } from 'react-router-dom';

function ListBlock4({ Num, Address, Price, Date, Request_id, State }) {
    const navigate = useNavigate();

    const getStateStyle = (state) => {
        switch (state) {
            case '요청 중':
                return { color: '#FF5555', backgroundColor: '#FFF0EE' };
            case '매칭 완료':
                return { color: '#FFC633', backgroundColor: '#FFFCE5' };
            case '작성 완료':
                return { color: '#3888FF', backgroundColor: '#E5F0FF' };
            case '매칭 실패':
                return { color: '#FF5555', backgroundColor: '#FFF0EE' };
            default:
                return { color: 'black', backgroundColor: 'transparent' };
        }
    };

    return (
        <div className='ListTitle'>
            <div className='ListTitleText2' style={{ fontWeight: 'bold' }}>{Num}</div>
            <div className='ListTitleText2_address' style={{ width: '45%' }}>{Address}</div>
            <div className='ListTitleText2' style={{ color: '#53C15F', fontWeight: '600' }}>{Price}</div>

            <div className='ListTitleText2'>
                <div style={{ fontWeight: '500', padding: '5px', borderRadius: '8px', display: 'flex', fontSize: '13.5px', justifyContent: 'center', alignItems: 'center', ...getStateStyle(State) }}>{State}</div>
            </div>
            <div className='ListTitleText2'>
                <div onClick={() => navigate(`/request/${Request_id}`)} className='list-request-box'>요청서 보기</div>
            </div>
            <div className='ListTitleText2' style={{ color: '#69666E', fontWeight: '400' }}>{Date}</div>
        </div>
    );
}

export default ListBlock4;
