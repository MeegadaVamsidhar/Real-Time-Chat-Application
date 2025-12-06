import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/Appicon';

const MessageInput = ({ messageInput, onMessageChange, onSendMessage, onFileSelect }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const fileInputRef = useRef(null);

    const emojis = ['😀', '😂', '😍', '👍', '🙏', '🎉', '🔥', '❤️', '😊', '🤔', '😅', '😭', '😎', '🙌', '✨', '👋'];

    const handleEmojiClick = (emoji) => {
        const newValue = messageInput + emoji;
        onMessageChange({ target: { value: newValue } });
        setShowEmojiPicker(false);
    };

    const handleFileIconClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && onFileSelect) {
            onFileSelect(file);
        }
        // Reset input so same file can be selected again
        e.target.value = '';
    };

    return (
        <div className="bg-card border-t border-border px-6 py-4 relative">
            {/* Emoji Picker Popover */}
            {showEmojiPicker && (
                <div className="absolute bottom-20 left-6 bg-card border border-border rounded-lg shadow-xl p-3 grid grid-cols-4 gap-2 z-10 w-64">
                    {emojis.map(emoji => (
                        <button
                            key={emoji}
                            onClick={() => handleEmojiClick(emoji)}
                            className="text-2xl hover:bg-muted p-2 rounded transition-colors"
                            type="button"
                        >
                            {emoji}
                        </button>
                    ))}
                </div>
            )}

            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />

            <form onSubmit={onSendMessage} className="max-w-4xl mx-auto">
                <div className="flex items-end gap-3">
                    <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className={`p-2.5 rounded-lg transition-colors duration-200 flex-shrink-0 ${showEmojiPicker ? 'bg-muted text-primary' : 'hover:bg-muted text-muted-foreground'}`}
                    >
                        <Icon name="Smile" size={22} />
                    </button>

                    <button
                        type="button"
                        onClick={handleFileIconClick}
                        className="p-2.5 hover:bg-muted rounded-lg transition-colors duration-200 flex-shrink-0"
                    >
                        <Icon name="Paperclip" size={22} className="text-muted-foreground" />
                    </button>

                    <div className="flex-1 relative">
                        <textarea
                            value={messageInput}
                            onChange={onMessageChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    onSendMessage(e);
                                }
                            }}
                            placeholder="Type a message..."
                            rows={1}
                            className="w-full px-4 py-2.5 bg-muted border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 resize-none"
                            style={{ minHeight: '42px', maxHeight: '120px' }}
                        />
                    </div>

                    <Button
                        type="submit"
                        size="icon"
                        className="flex-shrink-0 h-[42px] w-[42px]"
                        disabled={!messageInput.trim()}
                    >
                        <Icon name="Send" size={18} />
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default MessageInput;
