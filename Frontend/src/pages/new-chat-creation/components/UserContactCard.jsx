import React from 'react';
import Icon from '../../../components/Appicon';

const UserContactCard = ({ contact, isSelected, selectedType, onToggle }) => {
    return (
        <button
            onClick={() => onToggle(contact)}
            className={`
        w-full px-6 py-4 flex items-center gap-4 transition-all duration-200 hover:bg-muted
        ${isSelected ? 'bg-primary/5' : ''}
      `}
        >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="User" size={24} color="var(--color-primary)" />
                </div>
                {contact.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-success rounded-full border-2 border-card" />
                )}
            </div>

            {/* Contact Info */}
            <div className="flex-1 text-left min-w-0">
                <h4 className="font-medium text-foreground truncate">{contact.name}</h4>
                <p className="text-sm text-muted-foreground truncate">{contact.email}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{contact.lastSeen}</p>
            </div>

            {/* Selection Indicator */}
            {isSelected && selectedType === 'group' && (
                <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Icon name="Check" size={16} color="white" />
                    </div>
                </div>
            )}

            {/* Checkbox for group selection */}
            {!isSelected && selectedType === 'group' && (
                <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full border-2 border-border" />
                </div>
            )}
        </button>
    );
};

export default UserContactCard;
