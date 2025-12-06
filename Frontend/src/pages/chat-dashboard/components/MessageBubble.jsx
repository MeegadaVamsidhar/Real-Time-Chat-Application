import React from 'react';
import Icon from '../../../components/Appicon';

const MessageBubble = ({ message }) => {
    const isImage = (fileName) => {
        return /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName) || (message.fileUrl && message.fileUrl.startsWith('data:image'));
    };

    const renderFile = () => {
        if (!message.fileUrl) return null;

        if (isImage(message.fileName || '')) {
            return (
                <div className="mb-2 rounded-lg overflow-hidden">
                    <img src={message.fileUrl} alt={message.fileName || 'Image'} className="max-w-full h-auto max-h-64 object-cover" />
                </div>
            );
        }

        return (
            <div className="flex items-center gap-3 p-2 bg-background/50 rounded-lg mb-2">
                <div className="p-2 bg-background rounded-full">
                    <Icon name="File" size={20} className="text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate max-w-[150px]">{message.fileName || 'File'}</p>
                </div>
                <a href={message.fileUrl} download={message.fileName || 'download'} className="p-1 hover:bg-background rounded">
                    <Icon name="Download" size={16} />
                </a>
            </div>
        );
    };

    const formatTime = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[70%] ${message.isMine ? 'flex-row-reverse' : ''}`}>
                {!message.isMine && (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Icon name="User" size={16} color="var(--color-primary)" />
                    </div>
                )}

                <div>
                    <div
                        className={`px-4 py-2 rounded-2xl ${message.isMine
                            ? 'bg-primary text-primary-foreground rounded-br-sm'
                            : 'bg-card border border-border text-foreground rounded-bl-sm'
                            }`}
                    >
                        {renderFile()}
                        {message.content && message.content !== 'Attached a file' && (
                            <p className="text-sm break-words">{message.content}</p>
                        )}
                        {!message.content && !message.fileUrl && <p className="text-sm italic">Empty message</p>}
                        {message.content === 'Attached a file' && !message.fileUrl && (
                            <p className="text-sm">Attached a file</p>
                        )}
                    </div>
                    <p className={`text-xs text-muted-foreground mt-1 ${message.isMine ? 'text-right' : ''}`}>
                        {formatTime(message.timestamp)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
