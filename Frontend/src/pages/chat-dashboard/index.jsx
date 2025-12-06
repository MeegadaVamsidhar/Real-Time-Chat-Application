import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { chatsAPI, messagesAPI } from '../../services/api';
import socketService from '../../services/socket';
import ChatSidebar from '../../components/ui/ChatSidebar';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import Button from '../../components/ui/Button';
import Icon from '../../components/Appicon';

const ChatDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeChat, setActiveChat] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    // Fetch Chats
    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await chatsAPI.getChats();
                const formattedChats = response.chats.map(chat => {
                    let name = chat.chatName;
                    let avatar = chat.groupIcon;
                    let isOnline = false;

                    if (!chat.isGroupChat) {
                        const otherUser = chat.participants.find(p => p._id !== user._id);
                        if (otherUser) {
                            name = otherUser.fullName || otherUser.username;
                            avatar = otherUser.avatar;
                            isOnline = otherUser.isOnline;
                        }
                    }

                    return {
                        id: chat._id,
                        name: name,
                        type: chat.isGroupChat ? 'group' : 'direct',
                        lastMessage: chat.lastMessage?.content || '',
                        timestamp: chat.lastMessage ? new Date(chat.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
                        unreadCount: 0,
                        isOnline: isOnline,
                        avatar: avatar,
                        participants: chat.participants,
                        groupAdmin: chat.groupAdmin
                    };
                });
                setChats(formattedChats);
            } catch (error) {
                console.error('Failed to fetch chats:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchChats();
        }
    }, [user]);

    // Listen for new messages
    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            if (activeChat && newMessage.chat._id === activeChat.id) {
                // Formatting incoming message
                const formattedMessage = {
                    id: newMessage._id,
                    senderId: newMessage.sender._id,
                    senderName: newMessage.sender.fullName || newMessage.sender.username,
                    content: newMessage.content,
                    timestamp: new Date(newMessage.createdAt),
                    isMine: newMessage.sender._id === user._id
                };
                setMessages(prev => {
                    // Avoid duplicates
                    if (prev.some(m => m.id === formattedMessage.id)) return prev;
                    return [...prev, formattedMessage];
                });
            }
        };

        socketService.onNewMessage(handleNewMessage);

        return () => {
            socketService.off('new-message');
        };
    }, [activeChat, user]);


    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleChatSelect = async (chat) => {
        // Leave previous chat if any
        if (activeChat) {
            socketService.leaveChat(activeChat.id);
        }

        setActiveChat(chat);
        setMessages([]);

        // Join new chat room
        socketService.joinChat(chat.id);

        try {
            const response = await messagesAPI.getMessages(chat.id);
            const formattedMessages = response.messages.map(msg => ({
                id: msg._id,
                senderId: msg.sender._id,
                senderName: msg.sender.fullName || msg.sender.username,
                content: msg.content,
                timestamp: new Date(msg.createdAt),
                isMine: msg.sender._id === user._id
            }));
            // Reverse because backend likely returns newest first or we need to check order. 
            // Usually API returns paginated, new to old. If so, reverse. 
            // Assuming API returns newest first (descending), we reverse to show oldest at top.
            setMessages(formattedMessages.reverse());
        } catch (error) {
            console.error("Failed to load messages:", error);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!messageInput.trim() || !activeChat) return;

        const content = messageInput;
        setMessageInput(''); // Clear input immediately for better UX

        // Optimistic UI update (temporary ID)
        // Actually, let's just send it and wait for socket/API to confirm or render
        // But for smoothness we can append it. 
        // Let's rely on API response for ID to be safe, or just append after API success.

        try {
            const response = await messagesAPI.sendMessage({
                chatId: activeChat.id,
                content: content
            });

            // The socket will broadcast this message back to us if we are listening to 'new-message' room event
            // But usually the sender simply appends it or the socket handles it.
            // Let's see if our socketService emits it to us too. 
            // Usually socket.broadcast.to(room) excludes sender.
            // So we should append it manually here.

            const newMessage = response.message;
            const formattedMessage = {
                id: newMessage._id,
                senderId: newMessage.sender._id,
                senderName: newMessage.sender.fullName || newMessage.sender.username,
                content: newMessage.content,
                timestamp: new Date(newMessage.createdAt),
                isMine: true
            };

            setMessages(prev => [...prev, formattedMessage]);
            socketService.sendMessage(newMessage); // Emit to socket so others get it
        } catch (error) {
            console.error("Failed to send message:", error);
            // Verify if we should restore input
        }
    };

    const handleFileSelect = async (file) => {
        if (!file || !activeChat) return;

        // Convert to Base64 for simple storage/transfer (Note: Not recommended for large files in production)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64File = reader.result;

            try {
                const response = await messagesAPI.sendMessage({
                    chatId: activeChat.id,
                    content: 'Attached a file', // Fallback text
                    messageType: 'file',
                    fileUrl: base64File,
                    fileName: file.name
                });

                const newMessage = response.message;
                const formattedMessage = {
                    id: newMessage._id,
                    senderId: newMessage.sender._id,
                    senderName: newMessage.sender.fullName || newMessage.sender.username,
                    content: newMessage.content,
                    messageType: 'file',
                    fileUrl: base64File,
                    fileName: file.name,
                    timestamp: new Date(newMessage.createdAt),
                    isMine: true
                };

                setMessages(prev => [...prev, formattedMessage]);
                socketService.sendMessage(newMessage);
            } catch (error) {
                console.error("Failed to send file:", error);
            }
        };
        reader.onerror = (error) => {
            console.error("Error reading file:", error);
        };
    };

    const handleCreateChat = () => {
        navigate('/new-chat-creation');
    };

    const handleMoreClick = () => {
        if (activeChat?.type === 'group') {
            navigate('/group-chat-management');
        }
    };

    return (
        <div className="h-screen flex overflow-hidden bg-background">
            <ChatSidebar
                isOpen={sidebarOpen}
                onToggle={handleSidebarToggle}
                activeChat={activeChat}
                onChatSelect={handleChatSelect}
                onCreateChat={handleCreateChat}
                chats={chats}
            />

            <main className="flex-1 flex flex-col lg:ml-[300px]">
                {activeChat ? (
                    <>
                        <ChatHeader
                            activeChat={activeChat}
                            onMenuClick={handleSidebarToggle}
                            onMoreClick={handleMoreClick}
                        />
                        <MessageList messages={messages} />
                        <MessageInput
                            messageInput={messageInput}
                            onMessageChange={(e) => setMessageInput(e.target.value)}
                            onSendMessage={handleSendMessage}
                            onFileSelect={handleFileSelect}
                        />
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-background">
                        <div className="text-center max-w-md px-6">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                                <Icon name="MessageCircle" size={40} color="var(--color-primary)" />
                            </div>
                            <h2 className="text-2xl font-semibold text-foreground mb-3">Welcome to ChatFlow</h2>
                            <p className="text-muted-foreground mb-6">
                                Select a conversation from the sidebar to start messaging or create a new chat to connect with others.
                            </p>
                            <Button
                                onClick={handleCreateChat}
                                iconName="Plus"
                                size="lg"
                                className="shadow-lg hover:shadow-xl transition-shadow duration-200"
                            >
                                Start New Chat
                            </Button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ChatDashboard;
