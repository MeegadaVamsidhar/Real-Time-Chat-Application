const express = require('express');
const router = express.Router();
const {
    getMessages,
    sendMessage,
    markAsRead,
    deleteMessage
} = require('../controllers/messageController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.get('/:chatId', getMessages);
router.post('/', sendMessage);
router.put('/:messageId/read', markAsRead);
router.delete('/:messageId', deleteMessage);

module.exports = router;
