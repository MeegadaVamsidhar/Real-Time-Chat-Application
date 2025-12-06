import React from 'react';
import MessageBubble from './MessageBubble';
import Icon from '../../../components/Appicon';

const MessageList = ({ messages }) => {
    return (
        <div className="flex-1 overflow-y-auto bg-background px-6 py-4">
            <div className="max-w-4xl mx-auto space-y-4">
                {messages.length > 0 ? (
                    messages.map((message) => (
                        <MessageBubble key={message.id} message={message} />
                    ))
                ) : (
                    <div className="text-center py-12">
                        <Icon name="MessageCircle" size={64} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                        <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageList;
