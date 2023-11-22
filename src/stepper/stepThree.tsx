import { useState } from "react"
import {useFormik} from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import {stepThreeinitial, stepThreevalidation} from "../signinType";


const Stepthree = () => {

    const location = useLocation()
    const valStepI = location.state.stepOne
    const valStepII = location.state.stepTwo

    const nav = useNavigate();

    const formik = useFormik({
       initialValues: stepThreeinitial,
        validationSchema: stepThreevalidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async () => {
            const token = localStorage.getItem("jwt");
            try {
                const response = await fetch('https://app-stg.riverhead.me/api/loggedin/savemyconsultantprofile', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`,
                  },
                  body: JSON.stringify({...formik.values,...valStepII,...valStepI}),
                });
        
                if (response.ok) {
                  console.log('Profile saved successfully');

                  nav('/stepFour',{state:{stepOne:valStepI,stepTwo:valStepII,stepThree:formik.values}})
        
                  
                } else {
                  console.error('Failed to save profile');
                }
              } catch (error) {
                console.error('Error during profile saving:', error);
              }
        },
      });
    
    
    const [checked , setChecked] = useState<string>('')
    const [subCheck , setSubcheck] = useState<string>('')
    const { setFieldValue} = formik;
    console.log(formik.values.projects[0],'comm');

    return(
      <body className="stepthreebody">  
              <div className="container">
            <h3>Competencies*</h3>
            <p>Domain</p>
            <div className="checkbox1">
            
            <input value={checked} onChange={() => setChecked('true')} type="checkbox" name="manage" title="manage" />
            <label>Management Consulting</label>
            </div>

            {checked &&
            <div className="checkbox2">
                
            <input value={subCheck} onChange={() => setSubcheck('true')} type="checkbox" name="manage" title="manage"/>
            <label>**Risk & Compliance</label> 
            </div>
            }
            {subCheck&& <div className="checkbox3">
                <input type="checkbox" value={'c85e7f7d-5806-4a1e-a9d9-1b4a1cd7da14'}  name="competency" title="" />
                <label>**Enterprise Risk Management Frameworks Design & Implementation</label> 
            </div>}
            <div className="prof">
            <p>ProficiencyLevel*</p>
                <select onChange={(e) => setFieldValue('competencies[0].proficiencyLevel', e.target.value ) }>
                <option>Select ProficiencyLevel </option>
                    <option> Advanced </option>
                    <option> Beginner </option>
                    <option> professional </option>
                    </select>         
                   
                    
            </div>

            <div className="industry">
                <p>Industry*</p>
               <select onChange={(e) => setFieldValue('industryId', e.target.value ) } >
               <option value="Select">Select Industry</option>
               <option value='11'> Accounting</option>
               <option value='11'> Agriculture</option>
               <option value='11'> Art </option>
               <option value='11'>Asset/Investment Management</option>
               <option value='Automotive'>Automotive </option>
               <option value='Aviation'> Aviation</option>
               </select>
            </div>
            <div className="key">
                <p>Key Projects*</p>
                <input className="keyinput" onChange={(e) => setFieldValue('projects[0].name', e.target.value ) } type="text" placeholder=" Project name* "/>
                <p>Project Location</p>
                <select >
                    <option value='1' > select Location</option>
                    <option value='2'>Afghanistan</option>
                    <option value='3'>Italy</option>
                    <option value='4'>America</option>
                    <option value='5'>Jordan</option>
                    <option value='6'>Germany</option>
                    <option value='7'>Lebanon</option>
                </select>
                <p>Map your project to 1 or more of your selected competencies*</p>
                <p>Role summary*</p>
                <input onChange={(e) => setFieldValue('projects[0].summary', e.target.value ) } type="text" id="summary" className="desc" placeholder="Describe your role in the project"/>
                <p>Start Date*</p>
                <input onChange={(e) => setFieldValue('projects[0].startDate', e.target.value ) } id="startDate" type="date" className="dateInput"/>
                <p>End Date</p>
                <input onChange={(e) => setFieldValue('projects[0].endDate', e.target.value ) } id="endDate" type="date" className="dateInput"/>
            </div>
            <button className="stepThreebutton" onClick={formik.submitForm}>Next</button>

        </div>
        </body>
          )}

export default Stepthree