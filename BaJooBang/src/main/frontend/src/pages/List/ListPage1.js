import React, { useState } from 'react';
import './ListPage1.css';
import ListBlock from './ListBlock1';

function ListPage1() {
    const listData = [
        { Num: '1', Address: '서울특별시 서초구 서초동', Person: '홍길동', Star: '4.8' },
        { Num: '2', Address: '서울특별시 강남구 역삼동', Person: '이순신', Star: '4.9' },
        { Num: '3', Address: '서울특별시 강동구 천호동', Person: '장보고', Star: '4.7' },
        // 추가적인 데이터를 여기에 입력
    ];

    return(
        <div className='ListBackground'>
            {/* <div className='pageTitle'>
                발품 요청서 작성
            </div> */}
            <div className='ListBox'>
                <div className='ListTitle' style={{backgroundColor: 'rgba(162, 197, 121, 0.3)'}}>
                   <div className='ListTitleText_num'>번호</div> 
                   <div className='ListTitleText_address'>주소</div>
                   <div className='ListTitleText_person'>발품인</div>
                   <div className='ListTitleText_star'>별점</div>

                </div>
                {listData.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListBlock Num={item.Num} Address={item.Address} Person={item.Person} Star={item.Star} />
                        <div className='ListLine' />
                    </React.Fragment>
                ))}
            </div>
        
        </div>
    )
}

export default ListPage1;