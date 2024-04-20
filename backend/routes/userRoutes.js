
const express = require('express');
const router = express.Router();
const app = express();

const { getCurrentUser } = require('../controllers/clientController');
const { authenticateUser } = require('../middleware/authentication');



router.route('/').get(authenticateUser, getCurrentUser);

// router.get('/logout', logout);

module.exports = router; 