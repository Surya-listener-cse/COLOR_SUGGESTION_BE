import UserModel from "../model/user.js"
import Auth from '../utils/auth.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const getAllUsers = async(req,res)=>{
    try {
        let users = await UserModel.find({},{password:0})
        res.status(200).send({
            message:"User data fetched successfully",
            users
        })
        
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const getUserById = async(req,res)=>{
    try {
        let user = await UserModel.findOne({_id:req.params.id},{password:0})
        res.status(200).send({
            message:"User data fetched successfully",
            user
        })
        
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const editUserById = async (req, res) => {
    try {
        let data = {
            name:req.body.name ,
            email : req.body.email , 
            role : req.body.role
        }
        let user = await UserModel.findByIdAndUpdate({_id:req.params.id},data);
        res.status(200).send({
            message: "Data Edited Successfully",
            user
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        });
    }
};

const deleteUserById = async (req, res) => {
    try {
        let user = await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).send({
            message: "Data Deleted Successfully",
            user
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        });
    }
};

const signUp = async(req,res)=>{
    try {
        let user = await UserModel.findOne({email:req.body.email})
        console.log(user);
        if(!user){
            req.body.password = await Auth.hashPassword(req.body.password)
            await UserModel.create(req.body)
            res.status(201).send({
                message:"Signup Successfull",
            })
           
        }else{
            res.status(400).send({
                message:`User with ${req.body.email} is already exist`
            })
        }
        
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const signIn = async(req,res)=>{
    try {
        let user = await UserModel.findOne({email:req.body.email})
        if(user){
          if (await Auth.hashCompare(req.body.password,user.password)) {
            let token = await Auth.createToken({
                name:user.name,
                email:user.email,
                id:user.email,
                role:user.role
            })
            res.status(200).send({
                message:`Signin successfull`,
                token,
                name:user.name,
                id:user._id,
                role:user.role

            })
          } else {
            res.status(400).send({
                message:"Incorrect Password"
            })
          }
        }else{
            res.status(404).send({
                message:`User with ${req.body.email} does not exist`
            })
        }
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}


const forgotMail = async(req,res)=>{
    try {
        let user = await UserModel.findOne({email:req.body.email})

        if(user){
            const transporter = nodemailer.createTransport({
                service:"gmail",
                host:"smtp.gmail.email",
                port:587,
                secure:false,
                auth:{
                    user:process.env.MAIL_ID,
                    pass:process.env.MAIL_PASS
                }
            })
    
            const mailOption = {
                from:{
                    name:'STYLE_BOOK',
                    address:process.env.MAIL_ID
                },
                to:[req.body.email],
                subject:"Reset password link for STYLE_BOOK Application",
                
                html : `<div>
                <h6>Hello User , Please click the below link to reset your password </h6>
                <a>http://localhost:5173/landing-page/reset-password/${user._id}</a>
                </div>`
            }
    
            const sendMail = async(transporter,mailOption)=>{
                try {
                    await transporter.sendMail(mailOption);
                    res.status(201).send({
                        message:"Mail send Successfully"
                    })
                } catch (error) {
                    console.log(error);
                }
            }
            sendMail(transporter,mailOption)
        }else{
            res.status(404).send({
                message:`User With ${req.body.email} does not exist`
            })
        }
        
        
    } catch (error) {
        res.status(500).send({
             message: 'Failed to send password reset email.' 
        })
    }
}


const resetPassword = async(req,res)=>{
    try {

        const user = await UserModel.findOne({email:req.body.email})
        let newPassword = await Auth.hashPassword(req.body.password)
        user.password = newPassword;
        await user.save();
        res.status(201).send({
            message:"Password Reset Successfull"
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal server error"
        })
        
    }
}

export default {
    getAllUsers,
    signUp,
    signIn,
    forgotMail,
    resetPassword,
    deleteUserById,
    editUserById,
    getUserById
}