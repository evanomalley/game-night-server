// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) { this.users = data }
// }
const bcrypt = require('bcrypt');

//const jwt = require('jsonwebtoken');
//require('dotenv').config();
//const fsPromises = require('fs').promises;
const path = require('path');
const User = require("../db/models/user.models");

const handleRegister = async (req, res) => {

    const { name, email, password, confirmPassword } = req.body;

    if (!name|| !email || !password) return res.status(400).json({ 'message': 'All fields are required' });

    if (password.length < 6) return res.status(400).json({ 'message': 'Password needs to be longer than 6 characters' });

    const foundUser = await User.findOne({ email: email});
    
    if (foundUser){
        return res.status(409).json({ 'message': 'Email is already in use' });
    } else {
        const hashPass = await bcrypt.hash(password, 10);
        try {
            const user = await User.create({
                name: name,
                email: email,
                password: hashPass 
            });
            res.json({status: "ok"});
        } catch (e){
            res.status(500).json({status: "error", error: "Something went wrong"});
        }
    }
}

module.exports = { handleRegister };