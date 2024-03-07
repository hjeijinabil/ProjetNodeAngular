const Question = require('../Models/Question');
const User = require('../Models/user');

const { StatusCodes } = require('http-status-codes');



const createQuestion = async (req, res) => {
  console.log(req.body)


  req.body.user = req.user.id;
  const question = await Question.create(req.body);
  if (question)
    return res.status(StatusCodes.CREATED).json({ question });
  else
    return res.status(StatusCodes.BAD_REQUEST).json({ msg : 'invalid data' });
  
};



const getAllQuestions = async (req, res) => {
  const questions = await Question.find({ })

  if (questions) 
    return res.status(StatusCodes.OK).json({ questions });
  else
    return res.status(StatusCodes.NOT_FOUND).json({ msg : 'there is no questions' });


};


const updateQuestion = async (req, res) => {
  const { id: questionId } = req.params;
  const { topic, question, situation } = req.body;

  const doc = await Question.findOne({ _id: questionId });

  if (!doc) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: `No question with id ${questionId}`});
  }

  // checkPermissions(req.user, review.user);

  doc.rating = topic;
  doc.title = question;
  doc.comment = situation;

  const questionUpdated = await doc.save();
  if (questionUpdated)
    return res.status(StatusCodes.OK).json({ questionUpdated });
  else
    return res.status(StatusCodes.BAD_REQUEST).json({ msg : 'invalid data' });
};

const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: `No review with id ${reviewId}`});
  }

  // checkPermissions(req.user, review.user);
  try {
    console.log(review)

    await review.remove();
  }catch(error) {
    res.json({ error });
  }
  res.status(StatusCodes.OK).json({ msg: 'Success! Review removed' });
};

const getSingleQuestion = async (req, res) => {
  const { id: questionId } = req.params;

  const question = await Question.findOne({ _id: questionId });

  if (!question) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: `No question with id ${questionId}`});
  }

  res.status(StatusCodes.OK).json({ question });
};

module.exports = {
  createQuestion,
  getAllQuestions,
  updateQuestion,
  getSingleQuestion,
};
