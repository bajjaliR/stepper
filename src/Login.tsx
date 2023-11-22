import './App.css'
import { useFormik } from 'formik';
import { SigninValidation, initialValues } from './signinType';
import { useNavigate } from 'react-router-dom';

const Login = () => {
const nav = useNavigate()
    const formik = useFormik({
        initialValues:initialValues,
        validationSchema:SigninValidation,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit: () =>   handleSubmit()         
            
    })
    
    const handleSubmit = async () => {
    
        const url = 'https://app-stg.riverhead.me/api/users/login';
        const data = {
          username: formik.values.username,
          password: formik.values.password,
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
            console.log(responseData.refreshToken);
            localStorage.setItem('jwt',responseData?.jwt)
            nav('/stepI')
          } else {
            
            console.log('Login failed');
          }
        } catch (error) {
          console.error('Error during login:', error);
        }
      };
    
    
    return (
      <body className='loginbody'>
        <div className='login form-container'>
            <div >
            <h1>Login</h1>
            <form>
            <div className='youremail'>
                <label htmlFor="">Your Email</label>
                <input value={formik.values.username} onChange={(e)=> formik.setFieldValue('username',e.target.value)} type="email"/>
                <p>{formik.errors.username}</p>
            </div>
            <div className='yourpass'>
                <label htmlFor="">Your Password</label>
                <input value={formik.values.password} onChange={(e)=> formik.setFieldValue('password',e.target.value)} type="password"/>
                <p>{formik.errors.password}</p>
            </div>
            <div>
                <div>
                </div>
            </div>
            
            <button className='loginbutton' onClick={handleSubmit} type="button"> Login </button>
           
            <div>
                <span onClick={()=> nav('/register')} style={{color: 'blue'}}> New Here? </span>

            </div>

            </form>

            </div>

        </div>
        </body>
    );
};

export default Login ;