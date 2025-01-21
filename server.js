const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./backend/routes/User'); 
const pollRoutes = require('./backend/routes/Poll'); 
const dotenv=require('dotenv');

dotenv.config()

const app = express();

app.use(cors());
app.use(bodyParser.json());
// 'mongodb://localhost:27017/votingapp'

mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => console.log(error));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/polls', pollRoutes)

// Set the server port
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
