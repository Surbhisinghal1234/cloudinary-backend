import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());

const username = process.env.MONGO_USERNAME;
const password = encodeURIComponent(process.env.MONGO_PASSWORD);

mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.3j0ywmp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error', error);
});

//schema
const photoSchema = new mongoose.Schema({
  url:{
    type:String,
  }
});

const Photo = mongoose.model('Photo', photoSchema);

// POST
app.post('/photos', async (req, res) => {
  try {
    const { url } = req.body;
    const photo = new Photo({ url });
    await photo.save();
    res.json({ message: 'Photo URL saved' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to save photo URL' });
  }
});

//Get
app.get('/photos', async (req, res) => {
  try {
    const photos = await Photo.find();
    res.json(photos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'err' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
