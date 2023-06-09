import './App.css';
import Login from './Components/Login/Login'
import {Navigate, Route,Routes} from 'react-router-dom';
import Home from './views/Home';
import Patients from './views/patients';
import Signup from './Components/Signup/Signup';
import Default from './Components/Default';
import PatientView from './Components/PatientView/PatientView';
import RequireUser from './Components/RequireUser';
import { getItem, KEY_ACCESS_TOKEN } from './utils/localStorageManager';
function App() {
  return (
    <div>
      <Routes>
        {/* <Route element={<RequireUser/>}>
        <Route path='/Login/Patients' element={<Patients/>}></Route>
        </Route> */}
          <Route path='/patients' element={<Patients/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='*' element={<Default/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/patientView' element={<PatientView/>}></Route>
      </Routes>
    </div>
  );
}
export default App;
