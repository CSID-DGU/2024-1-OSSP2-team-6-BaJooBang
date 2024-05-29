import React, { useState } from 'react';
import './ListPage1.css';

function ListBlock2({Num, Address, month, date, request, state}) {
    const getStateStyle = (state) => {
        switch (state) {
            case '매칭 전':
                return { color: '#FF5555', backgroundColor: '#FFF0EE' };
            case '매칭 완료':
                return { color: '#FFC633', backgroundColor: '#FFFCE5' };
            case '평가 완료':
                return { color: '#3888FF', backgroundColor: '#E5F0FF' };
            default:
                return { color: 'black', backgroundColor: 'transparent' };
        }
    };

    return(
        
            
                <div className='ListTitle'>
                   <div className='ListTitleText2' style={{fontWeight: 'bold'}}>{Num}</div> 
                   <div className='ListTitleText2_address'>{Address}</div>
                   <div className='ListTitleText2' style={{ color: '#53C15F', fontWeight: '600'}}>{month}</div>

                    <div className='ListTitleText2'>
                        <div style={{ fontWeight: '500', padding: '5px', borderRadius: '8px', display: 'flex', fontSize: '13.5px', justifyContent: 'center', alignItems: 'center', ...getStateStyle(state) }}>{state}</div>
                    </div>                   <div className='ListTitleText2'>
                    <div className='list-request-box'>요청서 보기</div>
                   </div>
                   <div className='ListTitleText2' style={{ color:'#69666E', fontWeight: '400'}}>{date}</div>
                   
                </div>
        
        
    )
}

export default ListBlock2;