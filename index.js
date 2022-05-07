const express = require('express');
const app = express();
const cors = require('cors');

const corsOptions = require('./config/CorsOptions');
const credentials = require('./middleware/Credentials');
const verifyJWT = require("./middleware/verifyJWT");

//DB reqiurement
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');


// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);


app.use(express.urlencoded({ extended: false }));

//cors options
app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/game-night');

//routes
app.use('/api/login', require('./routes/Login'));
app.use('/api/logout', require('./routes/Logout'));
app.use('/api/register', require('./routes/Register'));
app.use('/api/refreshpls', require('./routes/RefreshToken'));

//protected routes
app.use(verifyJWT);
app.use('/api/games', require('./routes/Games'));

app.listen('3500', () => {
    console.log("server started");
});