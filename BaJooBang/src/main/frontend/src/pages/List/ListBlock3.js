import React, { useState } from 'react';
import './ListPage1.css';
import { useNavigate } from 'react-router-dom';

function ListBlock3({Num, Address, Price, Date, Request_id, Requester}) {
  const navigate = useNavigate();

    return(
        
            
                <div className='ListTitle'>
                   <div className='ListTitleText2' style={{fontWeight: 'bold'}}>{Num}</div>
                   <div className='ListTitleText2_address'>{Address}</div>
                   <div className='ListTitleText2'> 
                     <div style={{color: '#53C15F', fontWeight: '600'}}>{Price}</div>
                   </div>
                   <div className='ListTitleText2' style={{fontWeight: '500'}}>{Requester}</div>
                   <div className='ListTitleText2'>
                    <div onClick={() => navigate(`/request/${Request_id}`)} className='list-request-box'>요청서 보기</div>
                   </div>
                   <div className='ListTitleText2' style={{color:'#69666E', fontWeight: '400'}}>{Date}</div>
                </div>
        
        
    )
}

export default ListBlock3;