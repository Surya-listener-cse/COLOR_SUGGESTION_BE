import mongoose from "./index.js";


const colorSchema = new mongoose.Schema({
    color :{
        type:String , 
        required :[true,"Color is Required"]
    },
    matches : {
        type:Array ,
        default:["black"]
    },
    season:{
        type:String,
        default:"Normal"
    }
    
},
{
    collection:"colors",
    versionKey:false
}
)

const colorModel = mongoose.model("colors",colorSchema)

export default colorModel;