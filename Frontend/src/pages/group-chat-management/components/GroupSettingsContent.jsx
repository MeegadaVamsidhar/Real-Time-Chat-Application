import React from 'react';

const GroupSettingsContent = () => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Group Settings</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div>
                            <h4 className="font-medium text-foreground">Group Notifications</h4>
                            <p className="text-sm text-muted-foreground">Receive notifications for this group</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div>
                            <h4 className="font-medium text-foreground">Mute Notifications</h4>
                            <p className="text-sm text-muted-foreground">Temporarily mute all notifications</p>
                        </div>
                        <input type="checkbox" className="w-5 h-5" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div>
                            <h4 className="font-medium text-foreground">Pin Group</h4>
                            <p className="text-sm text-muted-foreground">Keep this group at the top of your list</p>
                        </div>
                        <input type="checkbox" className="w-5 h-5" />
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Permissions</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div>
                            <h4 className="font-medium text-foreground">Who can send messages</h4>
                            <p className="text-sm text-muted-foreground">Control who can send messages in this group</p>
                        </div>
                        <select className="px-3 py-1.5 bg-background border border-input rounded-lg text-sm">
                            <option>Everyone</option>
                            <option>Admins only</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div>
                            <h4 className="font-medium text-foreground">Who can add members</h4>
                            <p className="text-sm text-muted-foreground">Control who can add new members</p>
                        </div>
                        <select className="px-3 py-1.5 bg-background border border-input rounded-lg text-sm">
                            <option>Everyone</option>
                            <option>Admins only</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupSettingsContent;
