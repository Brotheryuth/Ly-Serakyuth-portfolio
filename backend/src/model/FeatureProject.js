const mongoose = require('mongoose')
const featureProjectSchema =new  mongoose.Schema({
    projectNmae:{
        type:String,
        require:[true , 'Project tittle is required'],
        trim:true,
    },
    projectDescription:{
        type:String,
        require:'Project description is required'
    },
    technologyUsed:{
        type: [String] , // array 
        default:[]
    },
    developPeriod:{
        type: String,
        require:'Development period time is required'
    },
    projectUrl:{
        type:String,
        trim:true,
        require:'Project url is required'
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
        type:int,
        
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