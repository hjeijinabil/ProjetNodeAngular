const express = require('express');
const router = express.Router();

const {
    getAllLawyer,
    getSingleLawyer
  } = require('../controllers/lawyerController');

  router.route('/').get(getAllLawyer);

  router.route('/:id').get(getSingleLawyer);

  
module.exports = router;