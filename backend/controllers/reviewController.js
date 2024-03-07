const Review = require('../Models/Review');
const User = require('../Models/user');

const { StatusCodes } = require('http-status-codes');



const createReview = async (req, res) => {
  const { lawyer: lawyerId } = req.body;

  const isValidLawyer = await User.findOne({ _id: lawyerId });

  if (!isValidLawyer) {
    res.status(StatusCodes.NOT_FOUND).json({ msg : `No lawyer with id : ${lawyerId}` });
  }

  const alreadySubmitted = await Review.findOne({
    lawyer: lawyerId,
    user: req.user.id,
  });


  if (alreadySubmitted) {
    alreadySubmitted.rating = req.body.rating
    const updatedReview = await alreadySubmitted.save();
    console.log("updated ",req.body.rating)
    if (updatedReview) {
      console.log("updated Suuc ",updatedReview)
      return res.status(StatusCodes.OK).json({ review:updatedReview });
    } else {
      console.log("updated error")
      return res.status(StatusCodes.BAD_REQUEST).json({ msg : 'update review error' });
    }
  }

  req.body.user = req.user.id;
  
  const review = await Review.create(req.body);
  console.log("created",review.rating)
  if (review)
    res.status(StatusCodes.CREATED).json({ review });
  else
    res.status(StatusCodes.BAD_REQUEST).json({ msg : 'create review error' });
};
const getAllReviews = async (req, res) => {
  const reviews = await Review.find({}).populate({
    path: 'lawyer',
    select: 'fullName email',
  });

  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};


const getUserRating = async (req, res) => {
  const { id: lawyerId } = req.params;
  const review = await Review.findOne({ lawyer: lawyerId,user:req.user.id });
  if (review) {
    res.status(StatusCodes.OK).json({ review });
    
  } else
    res.status(StatusCodes.NOT_FOUND).json({ msg: `No review with this lawyer ${lawyerId}`});
};

const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: `No review with id ${reviewId}`});
  }

  res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const { rating, title, comment } = req.body;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: `No review with id ${reviewId}`});
  }

  // checkPermissions(req.user, review.user);

  review.rating = rating;
  review.title = title;
  review.comment = comment;

  await review.save();
  res.status(StatusCodes.OK).json({ review });
};
const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;

  // const review = await Review.findOne({ _id: reviewId });
  const review = await Review.deleteOne({ _id: reviewId });


  if (!review) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: `No review with id ${reviewId}`});
  }

  // checkPermissions(req.user, review.user);
  // try {
  //   console.log(review)

  //   await review.remove();
  // }catch(error) {
  //   res.json({ error });
  // }
  res.status(StatusCodes.OK).json({ msg: 'Success! Review removed' });
};

const getSingleLawyerReviews = async (req, res) => {
  const { id: lawyerId } = req.params;
  const reviews = await Review.find({ lawyer: lawyerId })
  res.status(StatusCodes.OK).json({ reviews });
};



module.exports = {
  getUserRating,
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleLawyerReviews,
  
};
