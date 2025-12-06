const express = require('express');
const router = express.Router();
const {
    getChats,
    createChat,
    createGroupChat,
    getChat,
    updateGroupChat,
    addParticipant,
    removeParticipant,
    deleteChat
} = require('../controllers/chatController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.route('/')
    .get(getChats)
    .post(createChat);

router.post('/group', createGroupChat);

router.route('/:id')
    .get(getChat)
    .put(updateGroupChat)
    .delete(deleteChat);

router.put('/:id/add-participant', addParticipant);
router.put('/:id/remove-participant', removeParticipant);

module.exports = router;
