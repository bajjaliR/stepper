import { useFormik } from 'formik';
import { stepOneInitial, stepOneValidation } from '../signinType';
import { useNavigate } from 'react-router-dom';

const StepOne = () => {
  
    const nav = useNavigate()
  const formik = useFormik({
    initialValues: stepOneInitial,
    validationSchema: stepOneValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async () => {
        try {
            const response = await fetch('https://app-stg.riverhead.me/api/loggedin/savemyconsultantprofile', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`,
              },
              body: JSON.stringify(formik.values),
            });
    
            if (response.ok) {
              console.log('Profile saved successfully');
              nav('/stepTwo',{state:formik.values})
    
              
            } else {
              console.error('Failed to save profile');
            }
          } catch (error) {
            console.error('Error during profile saving:', error);
          }
    },
  });

  const { values, setFieldValue,errors } = formik;
console.log(formik);
const token = localStorage.getItem('jwt');
  
  return (
    <body className='steponebody'>
    <div className='stepone'>
      <h1>Step 1</h1>
      <form onSubmit={formik.submitForm}>
        <div>
        {errors.firstName&&<p style={{color:'red'}}>This field is required</p>}
          <label>First Name:</label>
          <input className='firstname'
            type="text"
            name="firstName"
            onChange={(e) => setFieldValue('firstName', e.target.value)}
            value={values.firstName}
          />
          
        </div>
        <div>
        {errors.lastName&&<p style={{color:'red'}}>This field is required</p>}
          <label>Last Name:</label>
          <input className='lastname'
            type="text"
            name="lastName"
            onChange={(e) => setFieldValue('lastName', e.target.value)}
            value={values.lastName}
          />
          {errors.cellPhone&&<p style={{color:'red'}}>This field is required</p>}
           <label>cell phone:</label>
          <input className='cellphone'
            type="text"
            name="cellPhone"
            onChange={(e) => setFieldValue('cellPhone', e.target.value)}
            value={values.cellPhone}/>

            {errors.emailAddress&&<p style={{color:'red'}}>This field is required</p>}
            <label>email:</label>
             <input className='email'
            type="text"
            name="emailAddress"
            onChange={(e) => setFieldValue('emailAddress', e.target.value)}
            value={values.emailAddress}/>


        {errors.gender&&<p style={{color:'red'}}>This field is required</p>}
          <label>Gender:</label>
          <select className='selectgender'
            style={{ height: '50px', width: '100%' }}
            onChange={(e) => setFieldValue('gender', e.target.value)}
            value={values.gender}>
            
             <option value="select">select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <button className='steponebutton' type="button" onClick={formik.submitForm}>
          Next
        </button>
      </form>
    </div>
    </body>
  );
};

export default StepOne;
