const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');

const {
  createQuestion,
  getAllQuestions,
  updateQuestion,
  getSingleQuestion,
} = require('../controllers/questionController');

router.route('/').post(authenticateUser, createQuestion).get(authenticateUser,getAllQuestions);

router
  .route('/:id')
  .get(getSingleQuestion)
  .patch(authenticateUser, updateQuestion)
  // .delete(authenticateUser, deleteReview);

module.exports = router;
