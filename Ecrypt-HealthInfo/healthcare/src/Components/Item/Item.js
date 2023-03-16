import React from 'react';
import './Item.css';
import {IoPersonCircle} from 'react-icons/io5';
function Item(param) {
  return (
    <div className='itemContainer'>
        <div className='iconAndName'>
            <h4 style={{fontSize: '32px'}}><IoPersonCircle/></h4>
            <h4>{param.name}</h4>
        </div>
        <p>Disease: {param.disease}</p>
        <div className='dateAndButton'>
            <p>Date: 6 March 2023</p>
            <button className='itemButton'>View Details</button>
        </div>
    </div>
  )
}

export default Item