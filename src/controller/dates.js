
import dotenv from 'dotenv'
dotenv.config()
import DatesModel from '../model/dates.js'



const getAllDates = async(req,res)=>{
    try {
        let dates = await DatesModel.find({})
        res.status(200).send({
            message:"date Fetched Successfull",
            dates
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal server error"
        })
    }
}

const createDate =async(req,res)=>{
    try {
        let date = await DatesModel.findOne({date:req.body.date})
        if(!date){
            await DatesModel.create(req.body)
            res.status(200).send({
                message:"New date Added Successfully",
                top:req.body
            })
        }else{
            res.status(404).send({
                message:`date with ${req.body.date} already exist. Please Try Different Name`,
                date:req.date,
                matches : req.matches
            })
        }
        
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal server error"
        })
    }
}           

const getDateById = async(req,res)=>{
    try {
        let date = await DatesModel.findOne({_id:req.params.id})
        res.status(200).send({
            message:"date  fetched successfully",
            date
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal server error"
        })
    }
}

const editDateById = async(req,res)=>{
    try {
        let data ={
            date : req.body.date, 
            event : req.body.event,
            dress : req.body.dress,
            place : req.body.place,
        } 
        const top = await DatesModel.findByIdAndUpdate({_id:req.params.id},data)
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

const deleteDateById = async(req,res)=>{
    try {
        const data = await DatesModel.findByIdAndDelete({_id:req.params.id})
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
    getAllDates,createDate,getDateById,editDateById,deleteDateById
}