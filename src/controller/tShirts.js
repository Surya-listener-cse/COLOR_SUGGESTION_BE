import multer from 'multer'
import dotenv from 'dotenv'
dotenv.config()
import TshirtModel from '../model/tShirts.js'



const getAllTshirt = async(req,res)=>{
    try {
        let tShirt = await TshirtModel.find({})
        res.status(200).send({
            message:"tShirt Data Fetched Successfull",
            tShirt
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
  

  const createTshirt = async (req, res) => {
    try {
      let tShirt = await TshirtModel.findOne({ dressName: req.body.dressName });
      if (!tShirt) {
        upload.single('imageFile')(req, res, async function(err) {
          if (err instanceof multer.MulterError) {
            return res.status(500).send({ message: 'Multer error occurred' });
          } else if (err) {
            return res.status(500).send({ message: 'Unknown error occurred' });
          }
          
          await TshirtModel.create({
            dressName: req.body.dressName,
            dressType: req.body.dressType,
            color: req.body.color,
            season: req.body.season, 
            description: req.body.description,
            lastWornDate: req.body.lastWornDate,
            imageFile: req.file.filename 
          });
          
          res.status(200).send({
            message: "New T-Shirt Added Successfully",
            tShirt: req.body
          });
        });
      } else {
        res.status(404).send({
          message: `tShirt with dressName '${req.body.dressName}' already exists. Please Try a Different Name`
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
      const tShirt = await TshirtModel.findByIdAndUpdate(req.params.id, updateData, { new: true });

      if (!tShirt) {
        return res.status(404).send({ message: "Dress not found" });
      }

      res.status(200).send({
        message: "Edited Successfully",
        data: tShirt // Send back the updated document data
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
        const data = await TshirtModel.findByIdAndDelete({_id:req.params.id})
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

const getTshirtById = async(req,res)=>{
    try {
        let tShirt = await TshirtModel.findOne({_id:req.params.id})
        res.status(200).send({
            message:"tShirt data fetched successfully",
            tShirt
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal server error"
        })
    }
}

export default {
    getAllTshirt,createTshirt,getTshirtById,editDressById,deleteDressById
}