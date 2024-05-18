import React, { useState } from 'react';
import './ListBlock1.css';

function ListBlock({Num, Address, Person, Star}) {
    return(
        
            
                <div className='ListTitle'>
                   <div className='ListTitleText_num'>{Num}</div> 
                   <div className='ListTitleText_address'>{Address}</div>
                   <div className='ListTitleText_person'>{Person}</div>
                   <div className='ListTitleText_star'>{Star}</div>

                </div>
        
        
    )
}

export default ListBlock;