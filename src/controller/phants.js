import dotenv from 'dotenv'
dotenv.config()
import PhantModel from '../model/phants.js'

import multer from 'multer'


const getAllPhants = async(req,res)=>{
    try {
        let phants = await PhantModel.find({})
        res.status(200).send({
            message:"Phants Data Fetched Successfull",
            phants
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal server error"
        })
    }
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './src/images');
    },
    filename: function(req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });
  

  const upload = multer({ storage: storage });
  

  const createPhant = async (req, res) => {
    try {
      let phant = await PhantModel.findOne({ dressName: req.body.dressName });
      if (!phant) {
        upload.single('imageFile')(req, res, async function(err) {
          if (err instanceof multer.MulterError) {
            return res.status(500).send({ message: 'Multer error occurred' });
          } else if (err) {
            return res.status(500).send({ message: 'Unknown error occurred' });
          }
          
          await PhantModel.create({
            dressName: req.body.dressName,
            dressType: req.body.dressType,
            color: req.body.color,
            season: req.body.season, // Ensure this field is properly set
            description: req.body.description,
            lastWornDate: req.body.lastWornDate,
            imageFile: req.file.filename 
          });
          
          res.status(200).send({
            message: "New phant Added Successfully",
            phant: req.body
          });
        });
      } else {
        res.status(404).send({
          message: `phant with dressName '${req.body.dressName}' already exists. Please Try a Different Name`
        });
      }
    } catch (error) {
      res.status(500).send({
        message: error.message || "Internal server error"
      });
    }
  };
  





const editDressById = async (req, res) => {
  upload.single('imageFile')(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res.status(500).send({ message: 'Multer error occurred' });
      } else {
        // An unknown error occurred when uploading.
        return res.status(500).send({ message: 'Unknown error occurred' });
      }
    }

    try {
      let updateData = {
        dressName: req.body.dressName,
        dressType: req.body.dressType,
        color: req.body.color,
        season: req.body.season,
        description: req.body.description,
        lastWornDate: req.body.lastWornDate,
      };

      // If there's a new file, update the imageFile field
      if (req.file) {
        updateData.imageFile = req.file.filename; // Ensure your model accepts this path
      }

      // Update the document in MongoDB
      const phant = await PhantModel.findByIdAndUpdate(req.params.id, updateData, { new: true });

      if (!phant) {
        return res.status(404).send({ message: "Dress not found" });
      }

      res.status(200).send({
        message: "Edited Successfully",
        data: phant // Send back the updated document data
      });

    } catch (error) {
      res.status(500).send({
        message: error.message || "Internal server error"
      });
    }
  });
};



const deleteDressById = async(req,res)=>{
    try {
        const data = await PhantModel.findByIdAndDelete({_id:req.params.id})
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

const getPhantById = async(req,res)=>{
    try {
        let phant = await PhantModel.findOne({_id:req.params.id})
        res.status(200).send({
            message:"Phant data fetched successfully",
            phant
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal server error"
        })
    }
}


export default {
    getAllPhants,createPhant,getPhantById,editDressById,deleteDressById
}