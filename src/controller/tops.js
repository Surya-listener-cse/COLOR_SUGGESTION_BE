import multer from 'multer';
import dotenv from 'dotenv';
import TopsModel from '../model/tops.js';
import path from 'path';
dotenv.config();




const getAllTops = async (req, res) => {
    try {
        let tops = await TopsModel.find({});
        res.status(200).send({
            message: "Tops Data Fetched Successfully",
            tops
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal server error"
        });
    }
};




const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './src/images');
    },
    filename: function(req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });
  

  const upload = multer({ storage: storage });
  

  const createTops = async (req, res) => {
    try {
      let top = await TopsModel.findOne({ dressName: req.body.dressName });
      if (!top) {
        upload.single('imageFile')(req, res, async function(err) {
          if (err instanceof multer.MulterError) {
            return res.status(500).send({ message: 'Multer error occurred' });
          } else if (err) {
            return res.status(500).send({ message: 'Unknown error occurred' });
          }
          await TopsModel.create({
            dressName: req.body.dressName,
            dressType: req.body.dressType,
            color: req.body.color,
            season: req.body.season, 
            description: req.body.description,
            lastWornDate: req.body.lastWornDate,
            imageFile: req.file.filename 
          });
          

          
          res.status(200).send({
            message: "New Top Added Successfully",
            top: req.body
          });
        });
      } else {
        res.status(404).send({
          message: `Top with dressName '${req.body.dressName}' already exists. Please Try a Different Name`
         
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
      const top = await TopsModel.findByIdAndUpdate(req.params.id, updateData, { new: true });

      if (!top) {
        return res.status(404).send({ message: "Dress not found" });
      }

      res.status(200).send({
        message: "Edited Successfully",
        data: top // Send back the updated document data
      });

    } catch (error) {
      res.status(500).send({
        message: error.message || "Internal server error"
      });
    }
  });
};


const getTopsById = async (req, res) => {
  try {
      let top = await TopsModel.findOne({ _id: req.params.id })
      res.status(200).send({
          message: "Top data fetched successfully",
          top
      })
  } catch (error) {
      res.status(500).send({
          message: error.message || "Internal server error"
      })
  }
};


const deleteDressById = async (req, res) => {
    try {
        const data = await TopsModel.findByIdAndDelete({ _id: req.params.id })
        res.status(200).send({
            message: "Data Deleted Successfully",
            data
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal server error"
        })
    }
};

export default {
    getAllTops,
    createTops,
    getTopsById,
    editDressById,
    deleteDressById
};