
// const User =require('../models/userModel')
// const {validationResult}=require('express-validator')
// const bcrypt=require("bcrypt")
// const jwt=require('jsonwebtoken')


// const registerUser=async(req,res)=>{
// try{
// const errors=validationResult(req)

// if(!errors.isEmpty()){
//     return res.status(200).json({
//         success:false,
//         msg:'Error',
//         errors:errors.array()
//     })
// }
// const {name,email,password}=req.body
// //Is user email already in db 
// const isExistUser=User.findOne({email})
// if(!isExistUser){
//     return res.status(200).json({
//         success:false,
//         msg:'Email already exist',
//     })
// }

// const hashedPassword=await bcrypt.hash(password,10)

// const user=new User({
//     name,
//     email,
//     password:hashedPassword
// })

// const userData=await user.save()


// return res.status(200).json({
//     success:true,
//     msg:'Register successfully',
//     data:userData
// })
// }
// catch(error){
//     return res.status(400).json({
//         success:false,
//         msg:error.message
//     })
// }
// }





// const generateAccessToken=async(user)=>{

// const token=jwt.sign(user,"secret_token_something",{
//     expiresIn:"2h",

// })

// return token

// }







// const loginUser=async(req,res)=>{
// try{
//     if(!errors.isEmpty()){
//         return res.status(200).json({
//             success:false,
//             msg:'Error',
//             errors:errors.array()
//         })
//     }

//     const {email,password}=req.body

//    const userData= await User.findOne({email})

//    if(!userData){
//     return res.status(400).json({
//         success:false,
//         msg:'Email & Password is incorrect',
  
//     })


//    }



  
// const isPasswordMatch=await bcrypt.compare(password,userData.password)
// if(!isPasswordMatch){
//     return res.status(400).json({
//         success:false,
//         msg:'Email & Password is incorrect',
//     })
// }



// const accessToken=await generateAccessToken({user:userData})
// return res.status(200).json({
//     success:true,
//     msg:'lOGIN succeaffuly',
//     accessToken:accessToken,
//     tokenType:"Bearer",
//     data:userData
// })

// }
// catch(error){
//     return res.status(400).json({
//         success:false,
//         msg:error.message
//     })
// }
// }

// module.exports={
//     registerUser,
//     loginUser
// }












const User = require('../models/userModel');
const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Error',
                errors: errors.array()
            });
        }

        const { name, email, password } = req.body;

        // Check if user email already exists in the database
        const isExistUser = await User.findOne({ email });
        if (isExistUser) {
            return res.status(400).json({
                success: false,
                msg: 'Email already exists',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        const userData = await user.save();

        return res.status(200).json({
            success: true,
            msg: 'Registered successfully',
            data: userData
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

const generateAccessToken = async (user) => {
    const token = jwt.sign({ userId: user._id }, "secret_token_something", {
        expiresIn: "2h",
    });

    return token;
};

const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Error',
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        const userData = await User.findOne({ email });

        if (!userData) {
            return res.status(400).json({
                success: false,
                msg: 'Email & Password are incorrect',
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, userData.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                msg: 'Email & Password are incorrect',
            });
        }

        const accessToken = await generateAccessToken(userData);
        return res.status(200).json({
            success: true,
            msg: 'Login successful',
            accessToken: accessToken,
            tokenType: "Bearer",
            data: userData
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};






//getProfile

const getProfile=async(req,res)=>{
    try {
        const user_id = req.user;
        const userData = await User.findOne({ _id: user_id });
        return res.status(200).json({
            success: true,
            msg: 'hello',
            data: userData
        });
    } 
    catch(error){

        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
}
module.exports = {
    registerUser,
    loginUser,
    getProfile
};
