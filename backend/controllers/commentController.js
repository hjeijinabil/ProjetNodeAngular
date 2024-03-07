const Comment = require('../Models/Comment');
const User = require('../Models/user');

const { StatusCodes } = require('http-status-codes');



const createComment = async (req, res) => {
  const { lawyer: lawyerId } = req.body;

  const isValidLawyer = await User.findOne({ _id: lawyerId });

  if (!isValidLawyer) {
    res.status(StatusCodes.NOT_FOUND).json({ msg : `No lawyer with id : ${lawyerId}` });
  }

  const alreadySubmitted = await Comment.findOne({
    lawyer: lawyerId,
    user: req.user.userId,
  });

  if (alreadySubmitted) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg : 'Already submitted comment for this lawyer' });
  }

  req.body.user = req.user.id;
  const comment = await Comment.create(req.body);
  res.status(StatusCodes.CREATED).json({ comment });
};
const getAllComment = async (req, res) => {
  const comments = await Comment.find({}).populate({
    path: 'lawyer',
    select: 'fullName email',
  });

  res.status(StatusCodes.OK).json({ comments });
};

const updateComment = async (req, res) => {
  const { id: commentId } = req.params;
  const { comment } = req.body;

  const doc = await Review.findOne({ _id: commentId });

  if (!doc) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: `No comment with id ${commentId}`});
  }

  doc.comment = comment;

  await doc.save();
  res.status(StatusCodes.OK).json({ comment });
};
const deleteComment = async (req, res) => {
  const { id: commentId } = req.params;

  // const review = await Review.findOne({ _id: reviewId });
  const comment = await Comment.deleteOne({ _id: commentId });


  if (!comment) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: `No comment with id ${commentId}`});
  }

  // checkPermissions(req.user, review.user);
  // try {
  //   console.log(review)

  //   await review.remove();
  // }catch(error) {
  //   res.json({ error });
  // }
  res.status(StatusCodes.OK).json({ msg: 'Success! comment removed' });
};

const getSingleLawyerComments = async (req, res) => {
  const { id: lawyerId } = req.params;
  const comments = await Comment.find({ lawyer: lawyerId })
  res.status(StatusCodes.OK).json({ comments });
};



module.exports = {
  createComment,
  getAllComment,
  updateComment,
  deleteComment,
  getSingleLawyerComments,
  
};
