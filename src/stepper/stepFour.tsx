import { useFormik } from "formik";
import { stepFourinitial, stepFourvalidation} from "../signinType";
import { useLocation } from "react-router-dom";
import { useState } from "react";





const Stepfour = () => {

    const location = useLocation()
    const valStepI = location.state.stepOne
    const valStepII = location.state.stepTwo
    const valStepIII = location.state.stepThree


    const formik = useFormik({
        initialValues:stepFourinitial,
        validationSchema:stepFourvalidation,
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
                  body: JSON.stringify({...formik.values,...valStepII,...valStepI,...valStepIII}),
                });
        
                if (response.ok) {
                    console.log('hello');
                    
                         await fetch('https://app-stg.riverhead.me/api/loggedin/SubmitMyProfile', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            'Authorization':`Bearer ${token}`,
                          },
                          body: JSON.stringify({}),
                        });
        
                  
                }else {
                  console.error('Failed to save profile');
                }
              } catch (error) {
                console.error('Error during profile saving:', error);
              }
        },
    })
    const [ checked, setChecked ] = useState<boolean>(false)
    const {setFieldValue , values} = formik
    console.log(formik);
    

    return(
        <body className="stepfourbody">
        <div>
         <div className="first">
            <p>Preferred Title on Riverhead*</p>
            
                <input placeholder="Enter your title" value={values.preferedTitle} onChange={(e)=>setFieldValue('preferedTitle',e.target.value)} className="yourtitle" type="text"/>
            </div>
            <div>
                <p>Preferred Utilization*</p>
                <div>
                    <input onChange={(e)=> setFieldValue('preferredUtilization',e.target.value)} type="radio" id="Preferred Utilization*" name="utilizatio" value='Full time' className="radio1"/>
                    <label>Full time</label>
                    <input onChange={(e)=> setFieldValue('preferredUtilization',e.target.value)} type="radio" id="Preferred Utilization*" name="utilizatio" value='50% to 75% of my working hours' className="radio2" />
                    <label>50% to 75% of my working hours</label>
                    <input onChange={(e)=> setFieldValue('preferredUtilization',e.target.value)} type="radio" id="Preferred Utilization*" name="utilizatio" value='25% to 50% of my working hours' className="radio3" />
                    <label>25% to 50% of my working hours</label>
                    <input onChange={(e)=> setFieldValue('preferredUtilization',e.target.value)} type="radio" id="Preferred Utilization*" name="utilizatio" value='Other' className="radio4"/>
                    <label>Other</label>
                    <br></br>
                    <br></br>
                    
                </div>
            </div>
            <div>
                <p>The Soonest Availability*</p>
                <input type="date" value={values.canBeAssignedToProjectBy} onChange={(e)=> setFieldValue('canBeAssignedToProjectBy', e.target.value)} className="availabilitydate"/>
            </div>
            <div>
                <div className="howtopay" >
                <p >What’s Your Preferred Rate?</p> 
                <select onChange={(e)=>setFieldValue('rateType',e.target.value)} className="billing">
                    <option>Billing</option>
                    <option value={'Hourly'} style={{color:'red'}}>Hourly</option>
                    <option value={'Daily'} style={{color:'blue'}}>Daily</option>
                    <option value={'Monthly'} style={{color:'gray'}}>Monthly</option>
                </select>
                </div>
                <div className="amount">
                <p>Amount</p>
                <input onChange={(e) => setFieldValue('amount', e.target.value)} className="inputamount" type="text" placeholder="Enter Amount"/>
                </div>
                <div className="currency">
                <p>Currency</p>
                <select onChange={(e)=> setFieldValue('currencyCode', e.target.value)}>
                    <option >Select Currency</option>
                    <option value={'EUR'}>Euro</option>
                    <option value={'USD'}>US Dollar</option>
                    <option value={'JOD'}>Jordanian Dinar</option>
                    <option value={'POUND'}>British Pound</option>
                </select>
                </div>
            </div>
            <div>
                <p>Onsite Availability*</p>
                <div>
                   <input value={Boolean(checked)}  onChange={(e) => {setChecked(!checked)
                    if(!checked){
                        setFieldValue('acceptOnlyOpportunitiesWithinCountryOfResidence',Boolean(e.target.value))
                    }
                    else{
                        setFieldValue('acceptOnlyOpportunitiesWithinCountryOfResidence',false)
                    }
                }} type="checkbox"/>
                    <label>I accept only opportunities within my country of residence</label> 
                   </div>

                   <br></br>

                   <div>
                   <input value={Boolean(checked)} onChange={(e) => {setChecked(!checked)
                    if(!checked){
                        setFieldValue('acceptOpportunitiesOutsideCountryOfResidence' ,Boolean(e.target.value))
                    }
                    else{
                        setFieldValue('acceptOpportunitiesOutsideCountryOfResidence', false)
                    }
                    }} type="checkbox"/> 


                   <label>I accept opportunities outside my country of residence</label>
                   </div>

                   <br></br>
                    <div>
                   <input value={Boolean(checked)} onChange={(e) => {setChecked(!checked)
                if(!checked){
                    setFieldValue('acceptOpportunitiesOutsideCountryOfResidenceWithPartialOnSite',Boolean(e.target.value))
                }
                else{
                    setFieldValue('acceptOpportunitiesOutsideCountryOfResidenceWithPartialOnSite', false)
                }
                     }} type="checkbox"/>

                    <label>I accept opportunities outside my country of residence but with partial onsite availability</label>    
                   </div>

                   <br></br> 

                   <div>
                   <input value={Boolean(checked)} onChange={(e) => {setChecked(!checked)
                if(!checked){
                    setFieldValue('acceptRemoteWorkOnly', Boolean(e.target.value))
                }
                else{
                    setFieldValue('acceptRemoteWorkOnly', false)
                }
                 }} type="checkbox"/>

                    <label>I accept only remote work</label>   
                   </div>     
            </div>
            <button onClick={formik.submitForm} className="submitbutton">Submit</button>

        </div>
        </body>
    )
}

export default Stepfour