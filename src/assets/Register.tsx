import { useState } from 'react';
import {useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hasAcceptedTermsAndConditions, setHasAcceptedTermsAndConditions] = useState(false);
  const navigate = useNavigate()
  const handleRegister = async () => {
    const url = 'https://app-stg.riverhead.me/api/users/SignUp';
    const data = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: email,
      password: password,
      confirmPassword: confirmPassword,
      hasAcceptedTermsAndConditions: hasAcceptedTermsAndConditions,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        navigate(`/otp?userVerificationCodeId=${responseData.userVerificationCodeId}`)
      } else {
    
        console.log('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <body className='registrationbody'>
    <div className="registration-form">
      <h1>Registration Form</h1>
      <div>
        <label>First Name:</label>
        <input className='fname'
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input className='lname'
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input className='regemail'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input className='regpassword'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input className='confirmpassword'
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div>
        <input className='regcheckbox'
          type="checkbox"
          id="termsAndConditions"
          checked={hasAcceptedTermsAndConditions}
          onChange={() => setHasAcceptedTermsAndConditions(!hasAcceptedTermsAndConditions)}
        />
        <label className='acceptterms' htmlFor="termsAndConditions">I accept the terms and conditions</label>
      </div>
      <button className='regbutton'
        type="button"
        onClick={handleRegister}
        disabled={!hasAcceptedTermsAndConditions}>
        Register
      </button>
      <button className='regloginbutton'
        type="button"
        onClick={()=>navigate("/login")}
      >
        login
      </button>
    </div>
    </body>
  );
};

export default RegistrationForm;
