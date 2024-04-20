const Message = require("./Message")
const User = require("../Models/user")
const { StatusCodes } = require('http-status-codes');

//require auth
const AddMessage = async (req, res) => {
    const { receiver: userId } = req.body;
  
    const isValidUser = await User.findOne({ _id: userId });
  
    if (!isValidUser) {
      res.status(StatusCodes.NOT_FOUND).json({ msg : `No user with id : ${userId}` });
    }

    console.log(req.body)
    req.body.sender = req.user.id;
    const message = await Message.create(req.body);

    console.log("mess")
    console.log(message)
    res.status(StatusCodes.CREATED).json({ message });
  };

  //require auth
  const getAllMessages = async (req, res) => {
    const messages = await Message.find({
        roomId : req.params.roomId
      });
      if (!messages)
        res.status(StatusCodes.NOT_FOUND).json({ messages:[] });
  
    res.status(StatusCodes.OK).json({ messages });
  };

  const getContactList = async (req, res) => {
    console.log(req.user.id)
      // const users = await User.find({ $or: [{ sender: req.user.id }, { receiver: req.user.id }] })
      const users1 = await Message
      
      // .find({ sender: req.user.id })
      
      // .populate({
      //   path: 'receiver',
      //   select: 'fullName email',
      // })
      .distinct('receiver',{ sender: req.user.id })

      console.log(users1)

      const users2 = await Message
      // .find({ receiver: req.user.id })
      // .distinct('sender')
      // .populate({
      //   path: 'sender',
      //   select: 'fullName email',
      // })
      .distinct('sender',{ receiver: req.user.id })

      console.log(users2)

      const mergedUsersSet = new Set([...users1, ...users2]);
      const mergedUsers = Array.from(mergedUsersSet);
      console.log("xxx")
      console.log("aa",mergedUsers)
      
      // select one attribute from Message find( reciever or sender with req.user.userId ) distinct
      if (!mergedUsers)
        res.status(StatusCodes.ok).json({ users:[] });
  
    res.status(StatusCodes.OK).json({ users : mergedUsers });
  };


  module.exports = {
    AddMessage,
    getAllMessages,
    getContactList,
  }