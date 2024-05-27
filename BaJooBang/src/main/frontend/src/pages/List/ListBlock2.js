import React, { useState } from 'react';
import './ListPage1.css';

function ListBlock2({Num, Address, month, date, request, state}) {
    return(
        
            
                <div className='ListTitle'>
                   <div className='ListTitleText2' style={{fontWeight: 'bold', width: '12%'}}>{Num}</div> 
                   <div className='ListTitleText2_address' style={{width: '45%'}}>{Address}</div>
                   <div className='ListTitleText2' style={{width: '15%', color: '#53C15F', fontWeight: '600'}}>{month}</div>
                   <div className='ListTitleText2' style={{width: '15%', color:'#69666E', fontWeight: '400'}}>{date}</div>
                   <div className='ListTitleText2' style={{width: '13%'}}>{state}</div>
                </div>
        
        
    )
}

export default ListBlock2;