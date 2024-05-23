import mongoose from "./index.js";



const dateSchema = new mongoose.Schema({
    date :{
        type:Date , 
        required :[true,"Date is Required"]
    },
    event :{
        type:String , 
        required:[true , "Event is Required"]
    }, 
    place :{
        type:String , 
        required:[true , "Place is Required"]
    }, 
    dress :{
        type:String , 
        required:[true , "Dress is Required"],
    }
    
},
{
    collection:"dates",
    versionKey:false
}
)

const datesModel = mongoose.model("dates",dateSchema)

export default datesModel;