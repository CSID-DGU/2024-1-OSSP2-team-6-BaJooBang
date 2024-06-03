import React, { useState } from 'react';
import './ListBlock1.css';

function ListBlock5({ Num, Address, Month, onClick }) {

    return(
        
            
                <div className='ListTitle' onClick={onClick}>
                   <div className='ListTitleText_num' style={{fontWeight: 'bold'}}>{Num}</div> 
                   <div className='ListTitleText_address'>{Address}</div>
                   <div className='ListTitleText_person' style={{color: '#53C15F', fontWeight: '600'}}>{Month}</div>
                   <div className='ListTitleText_star'>
                     <div className='list-request-box'>매물 보기</div>
                   </div>
                </div>
        
        
    )
}

export default ListBlock5;