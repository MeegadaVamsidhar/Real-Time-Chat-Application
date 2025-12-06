const Chat = require('../models/Chat');
const Message = require('../models/Message');
const User = require('../models/User');

// @desc    Get all chats for logged in user
// @route   GET /api/chats
// @access  Private
exports.getChats = async (req, res, next) => {
    try {
        const chats = await Chat.find({
            participants: req.user.id
        })
            .populate('participants', 'username fullName avatar isOnline lastSeen')
            .populate('groupAdmin', 'username fullName avatar')
            .populate({
                path: 'lastMessage',
                populate: {
                    path: 'sender',
                    select: 'username fullName avatar'
                }
            })
            .sort({ updatedAt: -1 });

        res.status(200).json({
            status: 'success',
            count: chats.length,
            chats
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create or get one-to-one chat
// @route   POST /api/chats
// @access  Private
exports.createChat = async (req, res, next) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide userId'
            });
        }

        // Check if user exists
        const otherUser = await User.findById(userId);
        if (!otherUser) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        // Check if chat already exists
        let chat = await Chat.findOne({
            isGroupChat: false,
            participants: { $all: [req.user.id, userId] }
        })
            .populate('participants', 'username fullName avatar isOnline lastSeen')
            .populate({
                path: 'lastMessage',
                populate: {
                    path: 'sender',
                    select: 'username fullName avatar'
                }
            });

        if (chat) {
            return res.status(200).json({
                status: 'success',
                chat
            });
        }

        // Create new chat
        chat = await Chat.create({
            participants: [req.user.id, userId],
            isGroupChat: false
        });

        chat = await Chat.findById(chat._id)
            .populate('participants', 'username fullName avatar isOnline lastSeen');

        res.status(201).json({
            status: 'success',
            chat
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create group chat
// @route   POST /api/chats/group
// @access  Private
exports.createGroupChat = async (req, res, next) => {
    try {
        const { chatName, participants } = req.body;

        if (!chatName || !participants || participants.length < 2) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide chat name and at least 2 participants'
            });
        }

        // Add creator to participants
        const allParticipants = [...new Set([req.user.id, ...participants])];

        const chat = await Chat.create({
            chatName,
            isGroupChat: true,
            participants: allParticipants,
            groupAdmin: req.user.id
        });

        const populatedChat = await Chat.findById(chat._id)
            .populate('participants', 'username fullName avatar isOnline lastSeen')
            .populate('groupAdmin', 'username fullName avatar');

        res.status(201).json({
            status: 'success',
            chat: populatedChat
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single chat
// @route   GET /api/chats/:id
// @access  Private
exports.getChat = async (req, res, next) => {
    try {
        const chat = await Chat.findById(req.params.id)
            .populate('participants', 'username fullName avatar isOnline lastSeen')
            .populate('groupAdmin', 'username fullName avatar');

        if (!chat) {
            return res.status(404).json({
                status: 'error',
                message: 'Chat not found'
            });
        }

        // Check if user is participant
        if (!chat.participants.some(p => p._id.toString() === req.user.id)) {
            return res.status(403).json({
                status: 'error',
                message: 'Not authorized to access this chat'
            });
        }

        res.status(200).json({
            status: 'success',
            chat
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update group chat
// @route   PUT /api/chats/:id
// @access  Private
exports.updateGroupChat = async (req, res, next) => {
    try {
        let chat = await Chat.findById(req.params.id);

        if (!chat) {
            return res.status(404).json({
                status: 'error',
                message: 'Chat not found'
            });
        }

        // Check if user is admin
        if (chat.groupAdmin.toString() !== req.user.id) {
            return res.status(403).json({
                status: 'error',
                message: 'Only group admin can update group details'
            });
        }

        const { chatName, groupDescription, groupIcon } = req.body;

        const fieldsToUpdate = {};
        if (chatName) fieldsToUpdate.chatName = chatName;
        if (groupDescription !== undefined) fieldsToUpdate.groupDescription = groupDescription;
        if (groupIcon !== undefined) fieldsToUpdate.groupIcon = groupIcon;

        chat = await Chat.findByIdAndUpdate(
            req.params.id,
            fieldsToUpdate,
            { new: true, runValidators: true }
        )
            .populate('participants', 'username fullName avatar isOnline lastSeen')
            .populate('groupAdmin', 'username fullName avatar');

        res.status(200).json({
            status: 'success',
            chat
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Add participant to group
// @route   PUT /api/chats/:id/add-participant
// @access  Private
exports.addParticipant = async (req, res, next) => {
    try {
        const { userId } = req.body;

        const chat = await Chat.findById(req.params.id);

        if (!chat || !chat.isGroupChat) {
            return res.status(404).json({
                status: 'error',
                message: 'Group chat not found'
            });
        }

        // Check if user is admin
        if (chat.groupAdmin.toString() !== req.user.id) {
            return res.status(403).json({
                status: 'error',
                message: 'Only group admin can add participants'
            });
        }

        // Check if user already in group
        if (chat.participants.includes(userId)) {
            return res.status(400).json({
                status: 'error',
                message: 'User already in group'
            });
        }

        chat.participants.push(userId);
        await chat.save();

        const updatedChat = await Chat.findById(chat._id)
            .populate('participants', 'username fullName avatar isOnline lastSeen')
            .populate('groupAdmin', 'username fullName avatar');

        res.status(200).json({
            status: 'success',
            chat: updatedChat
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Remove participant from group
// @route   PUT /api/chats/:id/remove-participant
// @access  Private
exports.removeParticipant = async (req, res, next) => {
    try {
        const { userId } = req.body;

        const chat = await Chat.findById(req.params.id);

        if (!chat || !chat.isGroupChat) {
            return res.status(404).json({
                status: 'error',
                message: 'Group chat not found'
            });
        }

        // Check if user is admin
        if (chat.groupAdmin.toString() !== req.user.id) {
            return res.status(403).json({
                status: 'error',
                message: 'Only group admin can remove participants'
            });
        }

        // Don't allow removing admin
        if (userId === chat.groupAdmin.toString()) {
            return res.status(400).json({
                status: 'error',
                message: 'Cannot remove group admin'
            });
        }

        chat.participants = chat.participants.filter(
            p => p.toString() !== userId
        );
        await chat.save();

        const updatedChat = await Chat.findById(chat._id)
            .populate('participants', 'username fullName avatar isOnline lastSeen')
            .populate('groupAdmin', 'username fullName avatar');

        res.status(200).json({
            status: 'success',
            chat: updatedChat
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete chat
// @route   DELETE /api/chats/:id
// @access  Private
exports.deleteChat = async (req, res, next) => {
    try {
        const chat = await Chat.findById(req.params.id);

        if (!chat) {
            return res.status(404).json({
                status: 'error',
                message: 'Chat not found'
            });
        }

        // For group chats, only admin can delete
        if (chat.isGroupChat && chat.groupAdmin.toString() !== req.user.id) {
            return res.status(403).json({
                status: 'error',
                message: 'Only group admin can delete the group'
            });
        }

        // Delete all messages in the chat
        await Message.deleteMany({ chat: chat._id });

        // Delete the chat
        await chat.deleteOne();

        res.status(200).json({
            status: 'success',
            message: 'Chat deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};
