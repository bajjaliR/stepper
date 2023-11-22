import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const OtpPage = () => {
  const [params] = useSearchParams();
  const userVerificationCodeId = params.get('userVerificationCodeId');
  const [otp, setOtp] = useState('');
  const nav = useNavigate()

  const handleConfirm = async () => {
    const url = 'https://app-stg.riverhead.me/api/otp/Verify';
    const data = {
      token: userVerificationCodeId,
      code: otp,
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
       nav('/stepI')
        
      } else {
       
        console.log('OTP verification failed');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
    }
  };

  return (
    <div className='otp-container'>
      <p>OTP</p>
      <div>
        <input className='otp-input'
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>
      <div>
        <button className='otpbutton' type="button" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
};
