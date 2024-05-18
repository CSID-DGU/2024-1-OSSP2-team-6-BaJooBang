import React, { useState } from 'react';
import './ListPage1.css';

function ListBlock2({Num, Address, month, date, request, state}) {
    return(
        
            
                <div className='ListTitle'>
                   <div className='ListTitleText2'>{Num}</div> 
                   <div className='ListTitleText2_address'>{Address}</div>
                   <div className='ListTitleText2'>{month}</div>
                   <div className='ListTitleText2'>{date}</div>
                   <div className='ListTitleText2'>{request}</div>
                   <div className='ListTitleText2'>{state}</div>
                </div>
        
        
    )
}

export default ListBlock2;