import React from 'react';
import Icon from '../../../components/Appicon';

const ChatHeader = ({ activeChat, onMenuClick, onMoreClick }) => {
    return (
        <div className="h-16 bg-card border-b border-border px-6 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors duration-200"
                >
                    <Icon name="Menu" size={20} />
                </button>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <Icon
                                name={activeChat.type === 'group' ? 'Users' : 'User'}
                                size={20}
                                color="var(--color-primary)"
                            />
                        </div>
                        {activeChat.isOnline && activeChat.type !== 'group' && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />
                        )}
                    </div>

                    <div>
                        <h2 className="font-semibold text-foreground">{activeChat.name}</h2>
                        <p className="text-xs text-muted-foreground">
                            {activeChat.type === 'group' ? `${activeChat.unreadCount || 8} members` : activeChat.isOnline ? 'Active now' : 'Offline'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-muted rounded-lg transition-colors duration-200">
                    <Icon name="Phone" size={20} className="text-foreground" />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors duration-200">
                    <Icon name="Video" size={20} className="text-foreground" />
                </button>
                <button
                    className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
                    onClick={onMoreClick}
                >
                    <Icon name="MoreVertical" size={20} className="text-foreground" />
                </button>
            </div>
        </div>
    );
};

export default ChatHeader;
