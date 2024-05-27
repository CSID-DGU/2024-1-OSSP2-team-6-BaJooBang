import React, { useState } from 'react';
import './ListBlock1.css';

function ListBlock({ Num, Address, Person, Star, onClick }) {

    return(
        
            
                <div className='ListTitle' onClick={onClick}>
                   <div className='ListTitleText_num' style={{fontWeight: 'bold'}}>{Num}</div> 
                   <div className='ListTitleText_address'>{Address}</div>
                   <div className='ListTitleText_person' style={{fontWeight: '500'}}>{Person}</div>
                   <div className='ListTitleText_star'>
                       <div className='list-star-box'>{Star}</div>
                   </div>
                </div>
        
        
    )
}

export default ListBlock;