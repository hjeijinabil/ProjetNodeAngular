const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');

const {
    AddMessage,
    getAllMessages,
    getContactList,
} = require('./chatController');

router.route('/').post(authenticateUser, AddMessage);

router.get('/contactList', authenticateUser, getContactList);


router.route('/:roomId').get(getAllMessages);

// router.route('/contactList').get(authenticateUser, getContactList)



module.exports = router;
