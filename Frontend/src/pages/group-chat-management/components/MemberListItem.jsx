import React from 'react';
import Icon from 'components/Appicon';

const MemberListItem = ({ member, onRoleChange, onRemove }) => {
    return (
        <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Icon name="User" size={24} color="var(--color-primary)" />
            </div>

            {/* Member Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground">
                        {member.name}
                        {member.isYou && (
                            <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                You
                            </span>
                        )}
                    </h4>
                    {member.role === 'Admin' && (
                        <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">
                            Admin
                        </span>
                    )}
                </div>
                <p className="text-sm text-muted-foreground truncate">{member.username}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                    Joined {member.joinedDate}
                </p>
            </div>

            {/* Actions */}
            {!member.isYou && (
                <div className="flex items-center gap-2 flex-shrink-0">
                    <select
                        value={member.role}
                        onChange={(e) => onRoleChange(member.id, e.target.value)}
                        className="px-3 py-1.5 bg-background border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                        <option value="Admin">Admin</option>
                        <option value="Member">Member</option>
                    </select>
                    <button
                        onClick={() => onRemove(member.id)}
                        className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors duration-200"
                        title="Remove member"
                    >
                        <Icon name="UserMinus" size={18} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default MemberListItem;
