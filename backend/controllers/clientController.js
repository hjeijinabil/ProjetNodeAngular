const User = require("../Models/user")
const { StatusCodes } = require('http-status-codes');

const getCurrentUser = async (req, res) => {
    const id = req.user.id;
    
  
    const doc = await User.findOne({ _id: id });
  
    if (!doc) {
      res.status(StatusCodes.NOT_FOUND).json({ msg: `No user with id ${id}`});
    }
    
    res.status(StatusCodes.OK).json({ user : doc });
  };


module.exports = {
    getCurrentUser,
}