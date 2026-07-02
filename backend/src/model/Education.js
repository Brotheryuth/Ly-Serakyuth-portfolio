const mongeese = require('mongoose')
const educationSchema = new mongeese.Schema({
    institution:{
        type:String,
        require:[true,' School/Universy name is require'],
        trim:true
    },
    level:{
        type:String ,
        require:[true , 'Education level is required'],
        enum:['Primary School' , 'Secondary School', 'High School','University' , 'Other'],
        trim:true
    },
    degree:{
        type:String,
        default:'', // optional 
        trim:true
    },
    fieldOfStudy:{
        type:String,
        default: '',
        trim:true
    },
    startDate:{
        type:String,
        require:[true, 'Start date is required'],
    },
    endDate:{
        type:String,
        require:[true, 'End date is required']
    },
    description:{
        type:String ,
        default:'',
        trim:true
    }
})
const education = mongeese.model('EducationSchema', educationSchema );
module.exports = education;