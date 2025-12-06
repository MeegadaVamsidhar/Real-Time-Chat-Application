import React from 'react';
import Icon from '../../../components/Appicon';

const UserSearchBar = ({ searchQuery, onSearchChange }) => {
    return (
        <div className="px-6 py-4 border-b border-border">
            <div className="relative">
                <Icon
                    name="Search"
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-muted border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
                />
            </div>
        </div>
    );
};

export default UserSearchBar;
