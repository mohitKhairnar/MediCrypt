import React,{useState} from 'react';
import './Navbar.css';
// import Popup from 'reactjs-popup';
import './Popup.css'
import {GiHealthPotion} from 'react-icons/gi'
import {Link} from 'react-router-dom';
function Navbar() {
  const [popup,setPop]=useState(false)
  const handleClickOpen=()=>{
      setPop(!popup)
  }
  const closePopup=()=>{
      setPop(false)
  }
  return (
    <nav>
      <ul>
        <li className='leftNav'>
          <h3><GiHealthPotion/></h3>
          <h3>MediCrypt</h3>
        </li>
        <li className='rightNav'>
        <div className='button'>
        <h3>About</h3>
        </div>
        <div className='button'>
        <li><Link to='/Login'><h3 style={{color:'white'}}>Login</h3></Link></li>
        </div>
        <button onClick={handleClickOpen} className='button'>
        <h3>Join Session</h3>
        </button>
        <div>
                {
                    popup?
                    <div className="main">
                        <div className="popup">
                            <div className="popup-header">
                                <h4>Thanks for visiting MediCrypt!</h4>
                                <h4>We hope you enjoy your time on our site.</h4>
                                <div className='closePopup'>
                                <h1 onClick={closePopup}>X</h1>
                                </div>
                            </div>
                            <div className='popupBody'>
                            <p>This is the website for securing you health related information using cryptography. Without your permission no any outsider can view your prescription or reports.</p>
                            <h4>Now, you can join session created with doctor using private ID shared on your mail.</h4>
                            <input className='inputID' type="text" placeholder='Enter your ID here'/>
                            <button className='joinButton'><Link to='/PatientView'><h3 style={{color:"white"}}>Join Session</h3></Link></button>
                            </div>
                        </div>
                    </div>:""
                }
            </div>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar