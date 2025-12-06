const Message = require('../models/Message');
const Chat = require('../models/Chat');

// @desc    Get messages for a chat
// @route   GET /api/messages/:chatId
// @access  Private
exports.getMessages = async (req, res, next) => {
    try {
        const { chatId } = req.params;
        const { page = 1, limit = 50 } = req.query;

        // Check if user is participant of the chat
        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({
                status: 'error',
                message: 'Chat not found'
            });
        }

        if (!chat.participants.includes(req.user.id)) {
            return res.status(403).json({
                status: 'error',
                message: 'Not authorized to access this chat'
            });
        }

        const messages = await Message.find({ chat: chatId })
            .populate('sender', 'username fullName avatar')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Message.countDocuments({ chat: chatId });

        res.status(200).json({
            status: 'success',
            count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            messages: messages.reverse() // Reverse to show oldest first
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Send message
// @route   POST /api/messages
// @access  Private
exports.sendMessage = async (req, res, next) => {
    try {
        const { chatId, content, messageType = 'text', fileUrl, fileName } = req.body;

        if (!chatId || (!content && !fileUrl)) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide chatId and content or file'
            });
        }

        // Check if user is participant
        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({
                status: 'error',
                message: 'Chat not found'
            });
        }

        if (!chat.participants.includes(req.user.id)) {
            return res.status(403).json({
                status: 'error',
                message: 'Not authorized to send message to this chat'
            });
        }

        // Create message
        let message = await Message.create({
            sender: req.user.id,
            chat: chatId,
            content,
            messageType,
            fileUrl,
            fileName,
            readBy: [{ user: req.user.id }]
        });

        // Update chat's lastMessage
        chat.lastMessage = message._id;
        await chat.save();

        // Populate message
        message = await Message.findById(message._id)
            .populate('sender', 'username fullName avatar')
            .populate('chat');

        // Emit socket event (will be handled by socket handler)
        const io = req.app.get('io');
        const populatedChat = await Chat.findById(chatId)
            .populate('participants', 'username fullName avatar isOnline socketId');

        // Emit to all participants
        populatedChat.participants.forEach(participant => {
            if (participant.socketId && participant._id.toString() !== req.user.id) {
                io.to(participant.socketId).emit('new-message', message);
            }
        });

        res.status(201).json({
            status: 'success',
            message
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Mark message as read
// @route   PUT /api/messages/:messageId/read
// @access  Private
exports.markAsRead = async (req, res, next) => {
    try {
        const message = await Message.findById(req.params.messageId);

        if (!message) {
            return res.status(404).json({
                status: 'error',
                message: 'Message not found'
            });
        }

        // Check if already read by user
        const alreadyRead = message.readBy.some(
            r => r.user.toString() === req.user.id
        );

        if (!alreadyRead) {
            message.readBy.push({ user: req.user.id });
            await message.save();
        }

        res.status(200).json({
            status: 'success',
            message
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete message
// @route   DELETE /api/messages/:messageId
// @access  Private
exports.deleteMessage = async (req, res, next) => {
    try {
        const message = await Message.findById(req.params.messageId);

        if (!message) {
            return res.status(404).json({
                status: 'error',
                message: 'Message not found'
            });
        }

        // Only sender can delete message
        if (message.sender.toString() !== req.user.id) {
            return res.status(403).json({
                status: 'error',
                message: 'Not authorized to delete this message'
            });
        }

        await message.deleteOne();

        // Emit socket event
        const io = req.app.get('io');
        const chat = await Chat.findById(message.chat)
            .populate('participants', 'socketId');

        chat.participants.forEach(participant => {
            if (participant.socketId) {
                io.to(participant.socketId).emit('message-deleted', {
                    messageId: req.params.messageId,
                    chatId: message.chat
                });
            }
        });

        res.status(200).json({
            status: 'success',
            message: 'Message deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};
