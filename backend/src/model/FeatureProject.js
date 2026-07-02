const mongoose = require('mongoose')
const featureProjectSchema =new  mongoose.Schema({
    projectName:{
        type:String,
        required:[true , 'Project title is required'],
        trim:true,
    },
    projectDescription:{
        type:String,
        required:[true,'Project description is required']
    },
    technologyUsed:{
        type: [String] , // array 
        default:[]
    },
    developPeriod:{
        type: String,
        required:[true,'Development period time is required']
    },
    projectUrl:{
        type:String,
        trim:true,
        required:[true,'Project url is required']
    },
    githubUrl:{
        type:String,
        trim:true,
    },
    lessonLearn:{
        type:String,
        trim:true
    },
    feature:{
        type:Boolean,
        default:false
    },
    challenge:{
        type:String,
        trim:true
    },
    problem:{
        type:String,
        trim:true
    },
    createAt:{
        type:Date,
        default: Date.now
    }
})
const featureProject = mongoose.model('FeatureProject',featureProjectSchema);
module.exports = featureProject;