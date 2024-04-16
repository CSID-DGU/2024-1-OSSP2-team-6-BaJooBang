import React from 'react';
import './moldBox.css';
import MoldCheck from './moldCheck';

function MoldBox({title}) {
    return(
        <div className='moldBox'>
            {title}
            <MoldCheck/>
        </div>
    );
}

export default MoldBox;