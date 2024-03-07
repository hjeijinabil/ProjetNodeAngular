const User = require('../Models/user');

const { StatusCodes } = require('http-status-codes');

const getAllLawyer = async (req, res) => {
    const lawyers = await User.find({role : "lawyer"})
  
    res.status(StatusCodes.OK).json({ lawyers });
  };

  const getSingleLawyer = async (req, res) => {
    const { id: lawyerId } = req.params;
  
    const lawyer = await User.findOne({ _id: lawyerId });
  
    if (!lawyer) {
      res.status(StatusCodes.NOT_FOUND).json({ msg: `No lawyer with id ${lawyerId}`});
    }
  
    res.status(StatusCodes.OK).json({ lawyer });
  };

  module.exports = { 
    getAllLawyer,
    getSingleLawyer
  }