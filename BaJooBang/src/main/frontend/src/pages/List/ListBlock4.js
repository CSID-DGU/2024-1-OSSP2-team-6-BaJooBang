import React, { useState } from 'react';
import './ListPage1.css';

function ListBlock4({Num, Address, month, date,  state}) {
    return(
        
            
                <div className='ListTitle'>
                   <div className='ListTitleText2' style={{width: '12%', fontWeight: 'bold'}}>{Num}</div> 
                   <div className='ListTitleText2' style={{width: '45%'}}>{Address}</div>
                   <div className='ListTitleText2' style={{width: '15%', color: '#53C15F', fontWeight: '600'}}>{month}</div>
                   <div className='ListTitleText2' style={{width: '15%', color:'#69666E', fontWeight: '400'}}>{date}</div>
                   <div className='ListTitleText2' style={{width: '13%'}}>{state}</div>
                </div>
        
        
    )
}

export default ListBlock4;