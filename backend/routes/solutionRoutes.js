const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');

const {
  createSolution,
  getQuestionSolutions,
} = require('../controllers/solutionController');

router.route('/').post(authenticateUser, createSolution);

router
  .route('/:id')
  .get(getQuestionSolutions)
  // .patch(authenticateUser, updateQuestion)
  // .delete(authenticateUser, deleteReview);

module.exports = router;
