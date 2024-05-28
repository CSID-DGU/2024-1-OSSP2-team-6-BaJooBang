import React, { useState } from 'react';
import './ListPage1.css';

function ListBlock4({Num, Address, month, date, request, state}) {
    return(
        
            
                <div className='ListTitle'>
                   <div className='ListTitleText2' style={{ fontWeight: 'bold'}}>{Num}</div> 
                   <div className='ListTitleText2_address' style={{width: '45%'}}>{Address}</div>
                   <div className='ListTitleText2' style={{ color: '#53C15F', fontWeight: '600'}}>{month}</div>
                   
                   <div className='ListTitleText2' style={{fontWeight: '500'}}>{state}</div>
                   <div className='ListTitleText2'>
                    <div className='list-request-box'>요청서 보기</div>
                   </div>
                   <div className='ListTitleText2' style={{ color:'#69666E', fontWeight: '400'}}>{date}</div>
                </div>
        
        
    )
}

export default ListBlock4;