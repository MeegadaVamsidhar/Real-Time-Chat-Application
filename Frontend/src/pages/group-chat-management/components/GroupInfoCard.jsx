import React from 'react';
import Icon from 'components/Appicon';

const GroupInfoCard = ({ groupInfo }) => {
    return (
        <div className="bg-card rounded-xl border border-border p-6 mb-8 shadow-sm">
            <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={groupInfo.icon} size={40} color="var(--color-primary)" />
                </div>
                <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                                {groupInfo.name}
                                <button className="p-1 hover:bg-muted rounded transition-colors">
                                    <Icon name="Edit2" size={16} className="text-muted-foreground" />
                                </button>
                            </h2>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Icon name="Calendar" size={14} />
                                    <span>Created on {groupInfo.createdOn}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Icon name="Users" size={14} />
                                    <span>{groupInfo.memberCount} members</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-muted-foreground">
                        {groupInfo.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GroupInfoCard;
