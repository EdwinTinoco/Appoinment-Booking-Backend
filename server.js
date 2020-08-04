const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

// Connect to DB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, () => {
   console.log("MongoDB database connection established successfully");
});

// Middleware
app.use(cors());
app.use(express.json());

// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);



app.listen(port, () => {
   console.log(`Server is running on port: ${port}`);
});