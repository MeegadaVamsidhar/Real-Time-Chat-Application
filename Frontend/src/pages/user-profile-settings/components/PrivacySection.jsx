import React from 'react';
import Icon from '../../../components/Appicon';

const PrivacySection = () => {
    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <Icon name="Lock" size={20} className="text-primary" />
                    <h2 className="text-2xl font-semibold text-foreground">Privacy</h2>
                </div>
                <p className="text-muted-foreground">Control your privacy settings</p>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                        <h4 className="font-medium text-foreground">Profile Visibility</h4>
                        <p className="text-sm text-muted-foreground">Who can see your profile</p>
                    </div>
                    <select className="px-3 py-1.5 bg-background border border-input rounded-lg text-sm">
                        <option>Everyone</option>
                        <option>Contacts Only</option>
                        <option>Nobody</option>
                    </select>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                        <h4 className="font-medium text-foreground">Last Seen</h4>
                        <p className="text-sm text-muted-foreground">Show when you were last active</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                        <h4 className="font-medium text-foreground">Read Receipts</h4>
                        <p className="text-sm text-muted-foreground">Let others know when you've read their messages</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
            </div>
        </div>
    );
};

export default PrivacySection;
