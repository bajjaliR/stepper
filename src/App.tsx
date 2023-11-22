import { Route, Routes } from 'react-router-dom';
import './App.css' ;
import './Login' ;
import Login from './Login';
import Register from './assets/Register';
import { OtpPage } from './Otp';
import StepOne from './stepper/stepI';
import { StepII } from './stepper/stepTwo';
import Stepthree from './stepper/stepThree';
import Stepfour from './stepper/stepFour';


function App() {
  return (
    <div className='rami-bg'>
      <Routes>
        <Route path='login' element={ <Login /> } />
        <Route path='register' element={ <Register />} />  
        <Route path='otp' element={<OtpPage />} />
        <Route path='stepI' element={ <StepOne />} />
        <Route path='stepTwo' element={<StepII />} />
        <Route path='Stepthree' element={<Stepthree />} />
        <Route path='stepFour' element={<Stepfour />} />     
      </Routes>
   </div>
  )
}

export default App