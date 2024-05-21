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

  // const getContactList = async (req, res) => {
  //   console.log(req.user.id)
  //     // const users = await User.find({ $or: [{ sender: req.user.id }, { receiver: req.user.id }] })
  //     const users1 = await Message
      
  //     .find({ sender: req.user.id },'receiver')
  //         .populate({
  //           path: 'receiver',
  //       select: 'fullName email',
  //     }).exec();

  //     // console.log(users1)

  //     const users2 = await Message
  //     .find({ receiver: req.user.id },'sender')
  //     .populate({
  //       path: 'sender',
  //       select: 'fullName email',
  //     }).exec();

  //     const u1 = users1.map(message => message.receiver).filter(receiver => receiver);
  //     const u2 = users2.map(message => message.sender).filter(sender => sender);

  //     const mergedUsersSet = new Set([...u1, ...u2]);
  //     const mergedUsersWithDuplicates = Array.from(mergedUsersSet);


  //     const uniqueArray = mergedUsersWithDuplicates.filter((obj, index, self) =>
  //     index === self.findIndex((t) => (
  //       t._id.toString() === obj._id.toString()
  //     ))
  //   );
      
  //     // select one attribute from Message find( reciever or sender with req.user.userId ) distinct
  //     if (!uniqueArray)
  //       res.status(StatusCodes.OK).json({ users:[] });
  
  //   res.status(StatusCodes.OK).json({ users : uniqueArray });
  // };

  const getContactList = async (req, res) => {
    console.log("me",req.user.id)
    if (req.user.role ==='client') {
      const users = await User.find({ _id: { $ne: req.user.id }, role:'lawyer' });
    if (!users)
        res.status(StatusCodes.OK).json({ users:[] });

        const filteredUsers = users.filter(user => user._id !== req.user.id);
  
    res.status(StatusCodes.OK).json({ users : users });
    } else {
      const users = await User.find({ _id: { $ne: req.user.id }, role:'client' });
    if (!users)
        res.status(StatusCodes.OK).json({ users:[] });

        const filteredUsers = users.filter(user => user._id !== req.user.id);
  
    res.status(StatusCodes.OK).json({ users : users });
    }
    
  }


  module.exports = {
    AddMessage,
    getAllMessages,
    getContactList,
  }