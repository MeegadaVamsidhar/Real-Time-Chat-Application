import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/Appicon';

const ActionButtons = ({ selectedType, selectedContacts, onCreate }) => {
    if (selectedType !== 'group' || selectedContacts.length === 0) {
        return null;
    }

    return (
        <div className="mt-6 flex items-center justify-between p-4 bg-card rounded-xl border border-border shadow-sm">
            <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                    {selectedContacts.slice(0, 3).map((contact, idx) => (
                        <div
                            key={contact.id}
                            className="w-8 h-8 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center"
                            style={{ zIndex: 3 - idx }}
                        >
                            <Icon name="User" size={16} color="var(--color-primary)" />
                        </div>
                    ))}
                    {selectedContacts.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs font-medium">
                            +{selectedContacts.length - 3}
                        </div>
                    )}
                </div>
                <div>
                    <p className="text-sm font-medium text-foreground">
                        {selectedContacts.length} member{selectedContacts.length !== 1 ? 's' : ''} selected
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {selectedContacts.map(c => c.name).join(', ')}
                    </p>
                </div>
            </div>
            <Button
                onClick={onCreate}
                iconName="ArrowRight"
                iconPosition="right"
                size="lg"
            >
                Create Group
            </Button>
        </div>
    );
};

export default ActionButtons;
