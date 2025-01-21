const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/User'); 
const pollRoutes = require('./routes/Poll'); 

const app = express();

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/votingapp', {
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
