const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');

const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getUserRating,
  getSingleLawyerReviews,
} = require('../controllers/reviewController');

router.route('/').post(authenticateUser, createReview).get(getAllReviews);

router.route('/lawyer/:id').get(getSingleLawyerReviews);


router
  .route('/:id')
  .get(authenticateUser,getUserRating)
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview);

module.exports = router;
