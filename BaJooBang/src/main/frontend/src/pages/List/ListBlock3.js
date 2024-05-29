import React, { useState } from 'react';
import './ListPage1.css';

function ListBlock3({Num, Address, Price, Date, Request_id, State}) {
    return(
        
            
                <div className='ListTitle'>
                   <div className='ListTitleText2' style={{fontWeight: 'bold'}}>{Num}</div> 
                   <div className='ListTitleText2_address'>{Address}</div>
                   <div className='ListTitleText2'> 
                     <div style={{color: '#53C15F', fontWeight: '600'}}>{Price}</div>
                   </div>
                   <div className='ListTitleText2' style={{fontWeight: '500'}}>{Date}</div>
                   <div className='ListTitleText2'>
                    <div className='list-request-box'>{Request_id}</div>
                   </div>
                   <div className='ListTitleText2' style={{color:'#69666E', fontWeight: '400'}}>{State}</div>
                </div>
        
        
    )
}

export default ListBlock3;