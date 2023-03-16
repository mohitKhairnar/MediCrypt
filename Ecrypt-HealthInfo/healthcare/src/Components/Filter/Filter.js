import React,{useState} from 'react';
import './Filter.css';
import {FiFilter} from 'react-icons/fi';
import Item from '../Item/Item';

function Filter() {
  const [filterBy,filtering] = useState('Filter By ID');
  function filterByID() {
    filtering('Filter By ID');
  }
  function filterByName() {
    filtering('Filter By Name');
  }
  function filterByEmail() {
    filtering('Filter By Email');
  }
  return (
    <div className='filterContainer'>
      <div className='filterBy'>
        <button onClick={filterByID} className='filterByButton'>
          <div className='filterItem'>
          <FiFilter/>
          <h4>ID</h4>
          </div>
        </button>
        <button onClick={filterByName}  className='filterByButton'>
        <div className='filterItem'>
          <FiFilter/>
          <h4>Name</h4>
          </div>
        </button>
        <button onClick={filterByEmail}  className='filterByButton'>
        <div className='filterItem'>
          <FiFilter/>
          <h4>Email</h4>
          </div>
        </button>
      </div>
      <input className="filterInput" type="text" placeholder={filterBy} />
      <div className='allItems'>
        <Item name="Mohit Khairnar" disease="abc"/>
        <Item name="Abhishek Deokar" disease="pqr"/>
        <Item name="Ayush Wadalkar" disease="xyz"/>
        <Item name="Adwait Samak" disease="efg"/>
        <Item name="Sarthak Deshmukh" disease="hijk"/>
        <Item name="Mayuresh Shedmekhe" disease="kbc"/>
      </div>
    </div>
  )
}

export default Filter