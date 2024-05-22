import React, { useState } from 'react';
import './Matching.css';
import {ReactComponent as Profile1} from '../../components/images/mp_profile.svg';
import {ReactComponent as Profile2} from '../../components/images/profile2.svg';

function Matching() {
    
    return(
        <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{width: "70vw", display: 'flex', flexDirection:'row', padding: '10vw', justifyContent: 'center', alignItems: 'center'}}>
                <div className='MatchingPerson'>
                        <p style={{fontWeight:"500", marginTop: "10px"}}>요청인</p>
                        <Profile1/>
                        <p style={{fontSize: "25px", fontWeight: "500"}}>홍길동</p>
                </div>
                <div className='MatchingContent'>
                    <div className='MatchingContentLeft'>
                        <p>거래 가격</p>
                        <p>발품 일시</p>
                        <p>거래 마감 기한</p>
                    </div>
                    <div>
                        <div style={{margin: "17px"}} className='MatchingPartition'/>
                        <div style={{margin: "17px"}} className='MatchingPartition'/>
                        <div style={{margin: "17px"}} className='MatchingPartition'/>
                    </div>
                    <div className='MatchingContentLeft'>
                        <p>15,000원</p>
                        <p>2024년 3월 31일</p>
                        <p>2024년 4월 2일</p>
                    </div>
                    
                </div>
                <div className='MatchingPerson'>
                        <p style={{fontWeight:"500", marginTop: "10px"}}>발품인</p>
                        <Profile2/>
                        <p style={{fontSize: "25px", fontWeight: "500"}}>김동국</p>
                </div>
                
            </div>
            <div style={{width: "30vw", justifyContent: 'space-between', display: 'flex', flexDirection: 'row', margin: '-5vw'}}>
                <div className='MatchingDocument'>요청서</div>
                <div className='MatchingDocument'>발품서</div>
            </div>
            
        </div>
        
    )
}

export default Matching;