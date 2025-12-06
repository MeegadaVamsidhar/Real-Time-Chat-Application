import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../Appicon';

const ChatSidebar = ({
  isOpen = false,
  onToggle = () => { },
  activeChat = null,
  onChatSelect = () => { },
  onCreateChat = () => { },
  chats = [] // Accept chats as prop
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats?.filter(chat =>
    (chat.name || chat.chatName || 'Unknown').toLowerCase().includes(searchQuery?.toLowerCase())
  );

  const handleChatClick = (chat) => {
    onChatSelect(chat);
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  const handleNewChat = () => {
    onCreateChat();
    navigate('/new-chat-creation');
  };

  const handleProfileClick = () => {
    navigate('/user-profile-settings');
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  return (
    <>
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-card shadow-md hover:bg-muted transition-colors duration-200"
        aria-label="Toggle sidebar"
      >
        <Icon name={isOpen ? 'X' : 'Menu'} size={24} />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}
      <aside
        className={`
          fixed lg:fixed top-0 left-0 h-full w-[300px] bg-card border-r border-border z-40
          transform transition-transform duration-300 ease-smooth
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        <div className="sidebar-header flex items-center justify-center h-16 border-b border-border bg-primary/5">
          <div className="sidebar-logo flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 transition-all duration-300">
            <Icon name="MessageSquare" size={28} color="var(--color-primary)" />
          </div>
          <span className="ml-3 text-lg font-semibold text-foreground">ChatFlow</span>
        </div>

        <div className="p-4 border-b border-border">
          <div className="relative">
            <Icon
              name="Search"
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            {filteredChats?.map((chat) => (
              <button
                key={chat?.id}
                onClick={() => handleChatClick(chat)}
                className={`
                  w-full p-3 rounded-lg text-left transition-all duration-200
                  hover:bg-muted hover:scale-[1.02]
                  ${activeChat?.id === chat?.id ? 'bg-primary/10 border border-primary/20' : 'border border-transparent'}
                `}
              >
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Icon
                        name={chat?.type === 'group' ? 'Users' : 'User'}
                        size={20}
                        color="var(--color-primary)"
                      />
                    </div>
                    {chat?.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm text-foreground truncate">
                        {chat?.name}
                      </h3>
                      <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                        {chat?.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground truncate">
                        {chat?.lastMessage}
                      </p>
                      {chat?.unreadCount > 0 && (
                        <span className="flex-shrink-0 ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                          {chat?.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-border space-y-2">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02]"
          >
            <Icon name="Plus" size={20} />
            <span className="font-medium">New Chat</span>
          </button>

          <button
            onClick={handleProfileClick}
            className="w-full flex items-center gap-3 px-4 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-all duration-200 hover:scale-[1.02]"
          >
            <Icon name="Settings" size={20} />
            <span className="font-medium">Profile Settings</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default ChatSidebar;