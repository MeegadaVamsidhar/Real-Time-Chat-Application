import React from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/Appicon';

const SecuritySection = () => {
    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <Icon name="Shield" size={20} className="text-primary" />
                    <h2 className="text-2xl font-semibold text-foreground">Security</h2>
                </div>
                <p className="text-muted-foreground">Manage your password and security settings</p>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 space-y-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Change Password</h3>
                <Input type="password" label="Current Password" placeholder="Enter current password" />
                <Input type="password" label="New Password" placeholder="Enter new password" />
                <Input type="password" label="Confirm New Password" placeholder="Confirm new password" />
                <Button iconName="Lock">Update Password</Button>
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Two-Factor Authentication</h3>
                <p className="text-muted-foreground mb-4">Add an extra layer of security to your account</p>
                <Button variant="outline" iconName="Smartphone">
                    Enable 2FA
                </Button>
            </div>
        </div>
    );
};

export default SecuritySection;
