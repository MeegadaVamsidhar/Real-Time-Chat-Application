import React from 'react';
import Icon from '../../../components/Appicon';

const NotificationSection = () => {
    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <Icon name="Bell" size={20} className="text-primary" />
                    <h2 className="text-2xl font-semibold text-foreground">Notifications</h2>
                </div>
                <p className="text-muted-foreground">Manage how you receive notifications</p>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                        <h4 className="font-medium text-foreground">Message Notifications</h4>
                        <p className="text-sm text-muted-foreground">Get notified when you receive new messages</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                        <h4 className="font-medium text-foreground">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                        <h4 className="font-medium text-foreground">Sound Alerts</h4>
                        <p className="text-sm text-muted-foreground">Play sounds for new messages</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5" />
                </div>
            </div>
        </div>
    );
};

export default NotificationSection;
