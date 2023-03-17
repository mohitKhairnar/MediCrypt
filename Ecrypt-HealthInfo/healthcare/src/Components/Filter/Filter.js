import React,{useState,useEffect} from 'react';
import './Filter.css';
import {FiFilter} from 'react-icons/fi';
import Item from '../Item/Item';
import { axiosClient } from '../../utils/axiosClient';

function Filter() {
  const [filterText,setFilterText] = useState('');
  function handleSubmit(){
    console.log(filterText);
  }
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
  const [documents, setDocuments] = useState([]);

  useEffect(async () => {
    const response = await fetch('/save')
      .then(response => response.json())
      .then(data => setDocuments(data))
      .catch(error => console.error(error));
  }, []);

  console.log(documents);
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
      <form onSubmit={handleSubmit}>
          <input className="filterInput" type="text" placeholder={filterBy} onChange={(e)=>setFilterText(e.target.value)} />
      </form>
      <div className='allItems'>
        
        {documents.map(document => (
          <li key={document.id}>
            <Item name={document.patientName} age={document.age} weight={document.age}/>
          </li>
        ))}
      </div>
    </div>
  )
}

export default Filter