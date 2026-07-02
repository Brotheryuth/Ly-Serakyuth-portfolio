const user = require('../model/User')

/**
 * 
* @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const getAllInfo= async(req ,res) =>{
    try{
        const userinfo =await user.find();
        res.status(200).json({'Message':'Get all information' , 'user information':userinfo})
    }catch(e){
        res.status(400).json({messagge:e.Message});
    }
}

/**
 * @brief Get User By ID 
 * @param {import('express').Request} req
 * @param {import('express').Response} res 
 */
const getByID = async(req,res)=>{
    const {id} = req.params;
    try{
        const getUser = await user.findById(id);
        res.status(200).json({'Message':'User Found' , 'User':getUser});

    }catch(e){
        res.status(400).json({message:e.Message});
    }
}

/**
 * @brief A function use to update user information 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
 const updateUserInfo = async(req,res )=>{
    const {getID} = req.params;

    const {_id , ...updateData} = req.body; // remove id to makesure there's no duplicated id 
    try{
        const updateUser = await user.findByIdAndUpdate(getID , {$set:updateData}, {new:true,runValidators:true});

        if(!updateUser ){
            return res.status(404).json({message:'User not found'});
        }
        res.status(200).json({message:'Update successful' , user: updateUser});

    }catch(e){
        res.status(400).json({message:e.Message});
    }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const deleteUser = async(req,res)=>{
    const {id} = req.params;
    try{
        const delUser = await user.findByIdAndDelete(id);
        if(!delUser){
            return res.status(404).json({meesage:'User not found'});
        }
        res.status(200).json({message:'User delete successful' , deleteUser:delUser});
    }catch(e){
        res.status(400).json({message:e.message});
    }
}

module.exports={
    getAllInfo, getByID, updateUserInfo, deleteUser
}