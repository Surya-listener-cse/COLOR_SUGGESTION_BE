
import dotenv from 'dotenv'
dotenv.config()
import ColorModel from '../model/colors.js'



const getAllColors = async(req,res)=>{
    try {
        let colors = await ColorModel.find({})
        res.status(200).send({
            message:"Color Data Fetched Successfull",
            colors
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal server error"
        })
    }
}

const createColor =async(req,res)=>{
    try {
        let color = await ColorModel.findOne({color:req.body.color})
        if(!color){
            await ColorModel.create(req.body)
            res.status(200).send({
                message:"New Color Added Successfully",
                top:req.body
            })
        }else{
            res.status(404).send({
                message:`Color with ${req.body.color} already exist. Please Try Different Name`,
                color:req.color,
                matches : req.matches,
                season :req.body.season,
            })
        }
        
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal server error"
        })
    }
}           

const getColorById = async(req,res)=>{
    try {
        let color = await ColorModel.findOne({_id:req.params.id})
        res.status(200).send({
            message:"Color data fetched successfully",
            color
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal server error"
        })
    }
}

const editColorById = async(req,res)=>{
    try {
        let data ={
            color : req.body.color, 
            matches : req.body.matches,
            season : req.body.season ,
        } 
        const top = await ColorModel.findByIdAndUpdate({_id:req.params.id},data)
        res.status(201).send({
            message:"Edited Successfully",
            data
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal server error"
        })
    }
}

const deleteColorById = async(req,res)=>{
    try {
        const data = await ColorModel.findByIdAndDelete({_id:req.params.id})
        res.status(200).send({
            message:"Data Deleted Successfully",
            data
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal server error"
        })
    }
}

export default {
    getAllColors,createColor,getColorById,editColorById,deleteColorById
}