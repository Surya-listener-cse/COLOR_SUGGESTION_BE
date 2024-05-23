import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import AppRoutes from './src/routes/index.js'
const app = express()
app.use(express.json())
app.use(cors())
app.use(AppRoutes)


// .............................................................................
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/images/:filename', async (req, res) => {
  try {
      const filename = req.params.filename;
      const filepath = path.join(__dirname, 'src', 'images', filename);
      res.sendFile(filepath);
  } catch (error) {
      res.status(500).send({
          message: error.message || "Internal server error"
      });
  }
});

  // ....................................................................................................

app.listen(process.env.PORT , ()=>console.log(`App is Running in ${process.env.PORT}`))