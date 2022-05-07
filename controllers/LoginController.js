const bcrypt = require('bcrypt');

const User = require("../db/models/user.models");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
    
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ email: email});
    if (!foundUser) return res.sendStatus(401); //Unauthorized 

    const match = await bcrypt.compare(password, foundUser.password);

    if(match){
        //define token
        const accessToken = jwt.sign(
            {"email": foundUser.email},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '15m'}
        );

        const refreshToken = jwt.sign(
            {"email": foundUser.email},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );
        foundUser.refreshToken = refreshToken;
        await foundUser.save();
        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60* 60 * 1000});
        res.json({accessToken});
    } else {
        res.sendStatus(401);
    }
    
}

module.exports = { handleLogin };