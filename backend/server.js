require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user')

// express app
const app = express();

app.use(cors());
app.use(cors({
    origin: 'https://workout-tracking-client.vercel.app'
  }));
// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to db & Listening on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    });

