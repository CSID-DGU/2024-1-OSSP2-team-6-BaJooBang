import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ListBlock1.css';

function ListBlock5({ Num, Address, Month, house_id }) {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log('house_id : '+house_id);
        navigate(`/heloinfo/${house_id}`);
    };

    return (
        <div className='ListTitle'>
            <div className='ListTitleText_num' style={{fontWeight: 'bold'}}>{Num}</div>
            <div className='ListTitleText_address'>{Address}</div>
            <div className='ListTitleText_person' style={{color: '#53C15F', fontWeight: '600'}}>{Month}</div>
            <div className='ListTitleText_star'>
                <div className='list-request-box' onClick={handleClick}>매물 보기</div>
            </div>
        </div>
    );
}

export default ListBlock5;
