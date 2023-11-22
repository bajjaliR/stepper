import * as yup from 'yup'


export const initialValues = {
    username: '',
    password: ''    
}

export const SigninValidation = yup.object({
    username:yup.string().email('Please enter a valid Email').required('Please complete this field'),
    password:yup.string().required('Please complete this field').min(8,'Password must be at least 8 characters').matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
        'Password must contain at least one digit, one lowercase letter, and one uppercase letter'
      ),
    
})

export const stepOneInitial ={
    firstName: '',
    lastName: '',
    gender:'',
    address:{
        countryCode : 'JO'
    },
    cellPhone:'',
    emailAddress: '',

}


export const stepOneValidation = yup.object({
    firstName:yup.string().required('Please complete this field'),
    lastName:yup.string().required('Please complete this field'),
    emailAddress:yup.string().required('Please complete this field'),
    cellPhone:yup.string().required('Please complete this field'),
    gender:yup.string().required('Please complete this field'),
    
})

export const StepTwoValidation = yup.object({
    totalExperience : yup
    .number()
    .required('Total Years of Experience is required')
    .positive('Total Years of Experience must be a positive number'),

  
    summaryOfExperience: yup.string().required('Summary of Experience is required'),

    
});

export const stepTwoInitial = {
  totalExperience: 0, 
  consultantType: '', 
  summaryOfExperience: '', 
  degrees: [{
    institution: '',
    degree:'',
    specialization: '',
    startDate: null,
    endDate: null,
  }],
  professionalCertifications: [{
    name: '',
    body: '',
    date: null,
  }],
  companies: [{
    countryCode: 'JO',
    durationFrom: '',
    durationTo: '',
    industryId: '1' ,
    name: '',
    positionHeld: '',
    stillWorkingThere: false
  }],
  languages: [{
    language: '',
    level: 0,
  }],
};

export const stepThreeinitial = {
    competencies:[{
        subDomainId:"3d990d7a-c067-4db4-9583-24d9385fb35d",
        proficiencyLevel:"",
        competencyId:"c85e7f7d-5806-4a1e-a9d9-1b4a1cd7da14"
    }],
    projects:[{
        location: "AT",
        order: 1,
        role: "",
        startDate:'',
        endDate: '',
        competencyIds: ['c85e7f7d-5806-4a1e-a9d9-1b4a1cd7da14'],
        summary: '',
        name: '',

    }],
    industryId:''
};


export const stepThreevalidation = yup.object({
    

}); 

export const stepFourinitial={
    amount:"",
    preferedTitle:"",
    currencyCode: "",
    canBeAssignedToProjectBy:"",
    rateType:"",
    acceptOpportunitiesOutsideCountryOfResidence:false,
    acceptRemoteWorkOnly:false,
    acceptOpportunitiesOutsideCountryOfResidenceWithPartialOnSite:false,
    acceptOnlyOpportunitiesWithinCountryOfResidence:false


}

export const stepFourvalidation =yup.object({
    amount:yup.string(),
    preferedTitle:yup.string(),
    currencyCode:yup.string(),
    canBeAssignedToProjectBy:yup.string(),
    rateType:yup.string(),
    acceptOpportunitiesOutsideCountryOfResidence:yup.boolean(),
    acceptRemoteWorkOnly:yup.boolean(),
    acceptOpportunitiesOutsideCountryOfResidenceWithPartialOnSite:yup.boolean(),
    acceptOnlyOpportunitiesWithinCountryOfResidence:yup.boolean()
})


