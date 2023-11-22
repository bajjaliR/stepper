import { useFormik } from "formik";
import { stepTwoInitial, StepTwoValidation } from "../signinType";
import { useLocation, useNavigate } from "react-router-dom";

export const StepII = () => {
  const location = useLocation()
  const val = location.state
  console.log(val,'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
  
  const nav = useNavigate();
  const formik = useFormik({
    initialValues: stepTwoInitial,
    validationSchema: StepTwoValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await fetch(
          "https://app-stg.riverhead.me/api/loggedin/savemyconsultantprofile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({...formik.values, ...val} ),
          }
        );

        if (response.ok) {
          console.log("Profile saved successfully");

          nav("/Stepthree",{state:{stepOne:val,stepTwo:formik.values}});

        } else {
          console.error("Failed to save profile");
        }
      } catch (error) {
        console.error("Error during profile saving:", error);
      }
    },
  });
  const { values, setFieldValue } = formik;
  console.log(formik);
 
  

  return (
    
    <body className="steptwobody">
    <div className="rami123">
      <div className="totalexp">
        <p> Total Years of Experience*</p>
        <input className="experience"
          type="text"
          onChange={(e) => setFieldValue("totalExperience", e.target.value)}
          value={values.totalExperience}
        />
      </div>
      <div className="currentwork">
        <p>Current Work Arrangement*</p>
        <div className="radioinput" >
          <input  className="radio"
            type="radio"
            id="currentWorkArrangement"
            name="fav_language"
            value="Freelancer"
            onChange={(e) =>
              setFieldValue("consultantType", e.target.value)
            }
          />
          <label>Freelancer</label>

          <input className="radio"
            type="radio"
            id="Full-time"
            name="fav_language"
            value="Full-time"
            onChange={(e) =>
              setFieldValue("consultantType", e.target.value)
            }
          />
          <label>Full-time</label>

          <input className="radio"
            type="radio"
            id="Part-time"
            name="fav_language"
            value="PartTime"
            onChange={(e) =>
              setFieldValue("consultantType", e.target.value)
            }
          />
          <label>Part-time</label>

          <input className="radio"
            type="radio"
            id="Unemployed"
            name="fav_language"
            value="Unemployed"
            onChange={(e) =>
              setFieldValue("consultantType", e.target.value)
            }
          />
          <label>Unemployed</label>
        </div>
        <br></br>

        <div className="textarea">
          Summary of Experience*
          <textarea value={values.summaryOfExperience} onChange={(e)=>setFieldValue('summaryOfExperience',e.target.value)}>Describe Your Experience</textarea>
        </div>
        <div className="exsummary">
          <p>Education:</p>
          <div>
  <p>Degree*</p>
  <select className="selectdegree" onChange={(e) => setFieldValue('degrees[0].degree', e.target.value)}
  value={values.degrees[0].degree}>
    <option value="select">Select level</option>
    <option value="3">Bachelor's Degree</option>
    <option value="4">Master's Degree</option>
    <option value="5">Doctorate or Higher</option>
  </select>
</div>
<p>instituation*</p>

<input className="instituationinput" type="text" placeholder="e.g. Computer Science" onChange={(e) => setFieldValue("degrees[0].institution", e.target.value)}
 />

              <p>Specialization*</p>

              <input className="specializationinput" type="text" placeholder="" onChange={(e) => setFieldValue("degrees[0].specialization", e.target.value)}
              value={values.degrees[0].specialization} />
            </div>
            <div>
              <p>Start Date</p>
              <input className="dateLabel"
                value={values.degrees[0].startDate?values.degrees[0].startDate:''}
                type="date"
                id="start"
                name="startDate"
                min="2023-01-01"
                max="2027-12-31"
                onChange={(e) => setFieldValue("degrees[0].startDate", e.target.value)}
              />
              <p>End Date</p>
              <input className="dateLabel"
             value={values.degrees[0].endDate?values.degrees[0].endDate:''}
                type="date"
                id="end"
                name="endDate"
                min="2023-01-01"
                max="2030-12-31"
                onChange={(e) => setFieldValue("degrees[0].endDate", e.target.value)}
              />
            </div>
            <div>
              <p>Professional Certificates</p>
              <div>
                <input className="name" type="text" placeholder="Name" value={values.professionalCertifications[0].name}   onChange={(e) => setFieldValue("professionalCertifications[0].name", e.target.value) } />
                <input className="issuing" type="text" placeholder="Issuing Organization" value={values.professionalCertifications[0].body} onChange={(e) => setFieldValue("professionalCertifications[0].body", e.target.value) }/>
                <input className="dateLabel"
                  type="date"
                  id="issue"
                  name="issueDate"
                  min="1970-01-01"
                  max="2023/11/6"
                  value={values.professionalCertifications[0].date?values.professionalCertifications[0].date:''}
                  onChange={(e) => setFieldValue("professionalCertifications[0].date", e.target.value) }
                />
              </div>
            </div>
            <div>
              <p>Key Companies </p>
              <div>
                <input className="companyname" type="text" placeholder="Company Name*" onChange={(e) => setFieldValue("companies[0].name", e.target.value) }
                value={values.companies[0].name?values.companies[0].name:''} />
              </div>
              <div>
                <input className="position" placeholder="Position Held*" onChange={(e) => setFieldValue("companies[0].positionHeld", e.target.value) }
                value={values.companies[0].positionHeld?values.companies[0].positionHeld:''} />
              </div>
              <div>
                <input className="country" placeholder="Country of Residence*" onChange={(e) => setFieldValue("companies.countryCode", e.target.value) }  />
              </div>
              <div>
                <p>Start Date</p>
                <input className="dateLabel"
                  type="date"
                  id="start"
                  name="startDate"
                  min="2023-01-01"
                  max="2027-12-31"
                  value={values.companies[0].durationFrom}
                  onChange={(e) => setFieldValue("companies[0].durationFrom", e.target.value) }
                />
                <p>End Date</p>
                <input className="dateLabel"
                    value={values.companies[0].durationTo}
                  type="date"
                  id="end"
                  name="endDate"
                  min="2023-01-01"
                  max="2030-12-31"
                  onChange={(e) => setFieldValue("companies[0].durationTo", e.target.value) }
                />
            
              </div>
              <div>
                <p>Languages*</p>
                <select className="select" onChange={(e) => setFieldValue('languages[0].language', e.target.value)}
                value={values.languages[0].language}>
                  <option value="Select">Select Language</option>
                  <option value="English">English</option>
                  <option value="Mandarin">Mandarian</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Bengali">Bengali</option>
                  <option value="Russian">Russian</option>
                  <option value="Portuguese">Portuguese</option>
                  <option value="Indonesian">Indonesian</option>
                  <option value="Italian">Italian</option>
                  <option value="German">German</option>
                  <option value="Urdu">Urdu</option>
                </select>
                <div>
                  <p>Proficiency Level*</p>
                  <select className="select" onChange={(e) => setFieldValue('languages[0].level', e.target.value)}
                  value={values.languages[0].level} >
                    <option value="1">Select</option>
                    <option value="2">Native</option>
                    <option value={3}>Fluent</option>
                    <option value="4">Intermediate</option>
                    <option value="5">Beginner</option>
                  </select>
                  <div>
                    <button className="stepThreebutton" onClick={formik.submitForm}>Next</button>
                  </div>         
                </div>
              </div>
            </div>
          </div>
        </div>
        </body>
  );
};
