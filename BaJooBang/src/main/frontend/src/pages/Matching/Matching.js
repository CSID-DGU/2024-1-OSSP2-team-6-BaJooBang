import React, { useEffect, useState } from 'react';
import './Matching.css';
import {ReactComponent as Profile1} from '../../components/images/mp_profile.svg';
import {ReactComponent as Profile2} from '../../components/images/profile2.svg';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function Matching({ Request_id }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState();
    const [apiEndpoint, setApiEndpoint] = useState('');

    useEffect(() => {
        // Set the API endpoint based on the referring page
        if (location.state && location.state.fromPage === 'ListPage2') {
            setApiEndpoint('/member/registered/matching');
        } else if (location.state && location.state.fromPage === 'ListPage4') {
            setApiEndpoint('/member/footwork/matching');
        }
    }, [location]);

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                if (apiEndpoint) {
                    const response = await axios.get(apiEndpoint, {
                        headers: {
                            'request_id': Request_id
                        }
                    }); // Replace with your actual API endpoint
                    
                    setData(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [Request_id, apiEndpoint]);
    
    return(
        <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{width: "70vw", display: 'flex', flexDirection:'row', padding: '10vw', justifyContent: 'center', alignItems: 'center'}}>
                <div className='MatchingPerson'>
                        <p style={{fontWeight:"500", marginTop: "10px"}}>요청인</p>
                        <Profile1/>
                        <p style={{fontSize: "25px", fontWeight: "500"}}>{data?.requester}</p>
                </div>
                <div className='MatchingContent'>
                    <div className='MatchingContentLeft'>
                        <p>거래 가격</p>
                        <p>발품 일시</p>
                    </div>
                    <div>
                        <div style={{margin: "17px"}} className='MatchingPartition'/>
                        <div style={{margin: "17px"}} className='MatchingPartition'/>
                        <div style={{margin: "17px"}} className='MatchingPartition'/>
                    </div>
                    <div className='MatchingContentLeft'>
                        <p>{data?.price}</p>
                        <p>{data?.date}</p>
                    </div>
                    
                </div>
                <div className='MatchingPerson'>
                        <p style={{fontWeight:"500", marginTop: "10px"}}>발품인</p>
                        <Profile2/>
                        <p style={{fontSize: "25px", fontWeight: "500"}}>{data?.worker}</p>
                </div>
                
            </div>
            <div style={{width: "30vw", justifyContent: 'space-between', display: 'flex', flexDirection: 'row', margin: '-5vw'}}>
                <div onClick={() => navigate(`/request/${Request_id}`)} className='MatchingDocument'>발품서</div>
            </div>
            
        </div>
        
    )
}

export default Matching;
