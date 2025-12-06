import React from 'react';
import Icon from '../../../components/Appicon';

const ChatTypeSelector = ({ selectedType, onTypeSelect }) => {
    const types = [
        {
            id: 'direct',
            icon: 'MessageCircle',
            title: 'Direct Message',
            description: 'Start a one-on-one conversation'
        },
        {
            id: 'group',
            icon: 'Users',
            title: 'Group Chat',
            description: 'Create a group with multiple members'
        }
    ];

    return (
        <div className="mb-8">
            <h3 className="text-sm font-medium text-foreground mb-4">Choose Chat Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {types.map((type) => (
                    <button
                        key={type.id}
                        onClick={() => onTypeSelect(type.id)}
                        className={`
              relative p-6 rounded-xl border-2 transition-all duration-200 text-left
              ${selectedType === type.id
                                ? 'border-primary bg-primary/5 shadow-md'
                                : 'border-border hover:border-primary/50 hover:shadow-sm'
                            }
            `}
                    >
                        {selectedType === type.id && (
                            <div className="absolute top-4 right-4">
                                <Icon name="CheckCircle2" size={24} className="text-primary" />
                            </div>
                        )}
                        <div className="flex items-start gap-4">
                            <div className={`
                p-3 rounded-lg transition-colors duration-200
                ${selectedType === type.id ? 'bg-primary/10' : 'bg-muted'}
              `}>
                                <Icon
                                    name={type.icon}
                                    size={28}
                                    color={selectedType === type.id ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
                                />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-semibold text-foreground mb-1">{type.title}</h4>
                                <p className="text-sm text-muted-foreground">{type.description}</p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChatTypeSelector;
