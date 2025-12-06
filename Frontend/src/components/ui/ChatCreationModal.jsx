import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const ChatCreationModal = ({ 
  isOpen = false, 
  onClose = () => {},
  onCreateChat = () => {},
  chatType = 'direct'
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [availableUsers] = useState([
    { id: 1, name: 'John Doe', username: '@johndoe', isOnline: true },
    { id: 2, name: 'Sarah Wilson', username: '@sarahw', isOnline: true },
    { id: 3, name: 'Mike Johnson', username: '@mikej', isOnline: false },
    { id: 4, name: 'Emily Brown', username: '@emilyb', isOnline: true },
    { id: 5, name: 'David Lee', username: '@davidl', isOnline: false },
  ]);

  const filteredUsers = availableUsers?.filter(user =>
    user?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    user?.username?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const handleUserToggle = (user) => {
    setSelectedUsers(prev => {
      const isSelected = prev?.find(u => u?.id === user?.id);
      if (isSelected) {
        return prev?.filter(u => u?.id !== user?.id);
      }
      return chatType === 'direct' ? [user] : [...prev, user];
    });
  };

  const handleCreate = () => {
    if (selectedUsers?.length === 0) return;
    
    if (chatType === 'group' && !groupName?.trim()) return;

    const newChat = {
      id: Date.now(),
      name: chatType === 'group' ? groupName : selectedUsers?.[0]?.name,
      type: chatType,
      participants: selectedUsers,
      createdAt: new Date()?.toISOString()
    };

    onCreateChat(newChat);
    navigate('/chat-dashboard');
    handleClose();
  };

  const handleClose = () => {
    setSearchQuery('');
    setSelectedUsers([]);
    setGroupName('');
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 lg:p-6 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="relative w-full max-w-md bg-card rounded-lg shadow-xl border border-border animate-scale-in max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {chatType === 'group' ? 'Create Group Chat' : 'New Direct Message'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {chatType === 'group' ? 'Select members for your group' : 'Choose a person to chat with'}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {chatType === 'group' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Group Name
              </label>
              <input
                type="text"
                placeholder="Enter group name..."
                value={groupName}
                onChange={(e) => setGroupName(e?.target?.value)}
                className="w-full px-4 py-2 bg-muted border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              {chatType === 'group' ? 'Select Members' : 'Select Person'}
            </label>
            <div className="relative">
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full pl-10 pr-4 py-2 bg-muted border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
              />
            </div>
          </div>

          {selectedUsers?.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {selectedUsers?.map(user => (
                <div
                  key={user?.id}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm"
                >
                  <span>{user?.name}</span>
                  <button
                    onClick={() => handleUserToggle(user)}
                    className="hover:bg-primary/20 rounded-full p-0.5 transition-colors duration-200"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            {filteredUsers?.map(user => {
              const isSelected = selectedUsers?.find(u => u?.id === user?.id);
              return (
                <button
                  key={user?.id}
                  onClick={() => handleUserToggle(user)}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                    ${isSelected 
                      ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted border border-transparent'
                    }
                  `}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Icon name="User" size={20} color="var(--color-primary)" />
                    </div>
                    {user?.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-sm text-foreground">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.username}</p>
                  </div>
                  {isSelected && (
                    <Icon name="Check" size={20} color="var(--color-primary)" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6 border-t border-border flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2.5 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-all duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={selectedUsers?.length === 0 || (chatType === 'group' && !groupName?.trim())}
            className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatCreationModal;