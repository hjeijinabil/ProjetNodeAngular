const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');

const {
    createComment,
    getAllComment,
    updateComment,
    deleteComment,
    getSingleLawyerComments,
} = require('../controllers/commentController');

router.route('/').post(authenticateUser, createComment).get(getAllComment);

router.route('/lawyer/:id').get(getSingleLawyerComments);


router
  .route('/:id')
  .patch(authenticateUser, updateComment)
  .delete(authenticateUser, deleteComment);

module.exports = router;
