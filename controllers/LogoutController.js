const User = require("../db/models/user.models");

const handleLogOut = async (req, res) => {
    
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(201); 
    const refreshToken = cookies.jwt;

    //check for refresh token
    const foundUser = await User.findOne({ refreshToken: refreshToken});
    if (!foundUser){
        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
        return res.sendStatus(204);
    }

    foundUser.refreshToken = null;
    await foundUser.save();

    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
    res.sendStatus(204);

}

module.exports = { handleLogOut };