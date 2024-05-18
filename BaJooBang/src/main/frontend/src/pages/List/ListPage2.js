import React, { useState } from 'react';
import './ListPage1.css';
import ListBlock2 from './ListBlock2';

function ListPage2() {
    const listData = [
        { Num: '1', Address: '서울특별시 서초구 서초동', month: '2000/130', date: '2024.03.29', request: '0', state: '요청 중' },
        { Num: '2', Address: '서울특별시 강남구 역삼동', month: '1000/50', date: '2024.03.28', request: '1', state: '요청 중' },
        { Num: '3', Address: '서울특별시 강동구 천호동', month: '100/23', date: '2024.03.24', request: '4', state: '매칭 완료' },
        // 추가적인 데이터를 여기에 입력
    ];

    return(
        <div className='ListBackground'>
            {/* <div className='pageTitle'>
                발품 요청서 작성
            </div> */}
            <div className='ListBox'>
                <div className='ListTitle' style={{backgroundColor: 'rgba(162, 197, 121, 0.3)'}}>
                   <div className='ListTitleText2'>번호</div> 
                   <div className='ListTitleText2_address'>매물 주소</div>
                   <div className='ListTitleText2'>월세</div>
                   <div className='ListTitleText2'>등록일</div>
                   <div className='ListTitleText2'>신청 수</div>
                   <div className='ListTitleText2'>상태</div>

                </div>
                {listData.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListBlock2 Num={item.Num} Address={item.Address} month={item.month} date={item.date} request={item.request} state={item.state} />
                        <div className='ListLine' />
                    </React.Fragment>
                ))}
            </div>
        
        </div>
    )
}

export default ListPage2;