import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/Appicon';
import ChatTypeSelector from './components/ChatTypeSelector';
import UserSearchBar from './components/UserSearchBar';
import UserContactCard from './components/UserContactCard';
import ActionButtons from './components/ActionButtons';
import { usersAPI, chatsAPI } from '../../services/api';

const NewChatCreation = () => {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState('direct');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [availableContacts, setAvailableContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch users based on search query
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await usersAPI.getUsers(searchQuery);
                // Map API response to component expected format
                // API user: { _id, username, email, fullName, avatar, isOnline, lastSeen }
                // Component expects: { id, name, email, lastSeen, isOnline }
                const users = response.users || [];
                const formattedUsers = users.map(user => ({
                    id: user._id,
                    name: user.fullName || user.username,
                    email: user.email,
                    lastSeen: user.isOnline ? 'Active now' : (user.lastSeen ? new Date(user.lastSeen).toLocaleDateString() : 'Offline'),
                    isOnline: user.isOnline,
                    avatar: user.avatar
                }));
                setAvailableContacts(formattedUsers);
            } catch (err) {
                console.error('Failed to search users:', err);
                setError('Failed to load users');
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchUsers();
        }, 300); // Debounce search

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const handleTypeSelect = (type) => {
        setSelectedType(type);
        setSelectedContacts([]);
    };

    const handleContactToggle = async (contact) => {
        if (selectedType === 'direct') {
            setSelectedContacts([contact]);
            // For direct chat, immediately create/retrieve chat and navigate
            try {
                await chatsAPI.createChat(contact.id);
                navigate('/chat-dashboard');
            } catch (err) {
                console.error('Failed to create chat:', err);
                // Optionally show error to user
            }
        } else {
            setSelectedContacts(prev => {
                const isSelected = prev.find(c => c.id === contact.id);
                return isSelected ? prev.filter(c => c.id !== contact.id) : [...prev, contact];
            });
        }
    };

    const isContactSelected = (contact) => {
        return selectedContacts.find(c => c.id === contact.id);
    };

    const handleCreateChat = async () => {
        if (selectedType === 'group' && selectedContacts.length >= 2) {
            // Logic for creating group chat would go here
            navigate('/chat-dashboard');
        }
    };

    const handleBackToChats = () => {
        navigate('/chat-dashboard');
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <div className="bg-card border-b border-border px-6 py-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleBackToChats}
                            className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
                        >
                            <Icon name="ArrowLeft" size={20} className="text-foreground" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-semibold text-foreground">New Chat</h1>
                            <p className="text-sm text-muted-foreground mt-0.5">
                                Start a conversation or create a group
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto px-6 py-8">
                    <ChatTypeSelector
                        selectedType={selectedType}
                        onTypeSelect={handleTypeSelect}
                    />

                    {/* Contact Selection */}
                    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-border">
                            <h3 className="text-sm font-medium text-foreground">Select Contact</h3>
                        </div>

                        <UserSearchBar
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                        />

                        {/* Recent Contacts Label */}
                        <div className="px-6 py-3 bg-muted/50">
                            <div className="flex items-center gap-2">
                                <Icon name="Clock" size={16} className="text-muted-foreground" />
                                <span className="text-sm font-medium text-muted-foreground">Suggested Contacts</span>
                            </div>
                        </div>

                        {/* Contact List */}
                        <div className="divide-y divide-border max-h-[400px] overflow-y-auto">
                            {loading ? (
                                <div className="py-12 text-center text-muted-foreground">
                                    Loading...
                                </div>
                            ) : availableContacts.length > 0 ? (
                                availableContacts.map((contact) => (
                                    <UserContactCard
                                        key={contact.id}
                                        contact={contact}
                                        isSelected={isContactSelected(contact)}
                                        selectedType={selectedType}
                                        onToggle={handleContactToggle}
                                    />
                                ))
                            ) : (
                                <div className="py-12 text-center">
                                    <Icon name="Users" size={48} className="mx-auto mb-3 text-muted-foreground opacity-50" />
                                    <p className="text-muted-foreground">No contacts found</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <ActionButtons
                        selectedType={selectedType}
                        selectedContacts={selectedContacts}
                        onCreate={handleCreateChat}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewChatCreation;
