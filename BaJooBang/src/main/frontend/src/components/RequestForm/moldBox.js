import React from 'react';
import './moldBox.css';
import MoldCheck from './moldCheck';

function MoldBox({title, complete, savedState }) {
    return(
        <div className='moldBox'>
            {title}
            <MoldCheck complete={complete} savedState={savedState}/>
        </div>
    );
}

export default MoldBox;