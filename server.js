require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db');
const cacheRoutes = require('./routes/cacheRoutes');

const app = express();

app.use(express.json());

app.use('/api', cacheRoutes);

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(5000, () => console.log('Server is up and running'));
};

start();
