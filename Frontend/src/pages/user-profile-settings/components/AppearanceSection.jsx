import React from 'react';
import Icon from '../../../components/Appicon';

const AppearanceSection = () => {
    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <Icon name="Palette" size={20} className="text-primary" />
                    <h2 className="text-2xl font-semibold text-foreground">Appearance</h2>
                </div>
                <p className="text-muted-foreground">Customize how ChatFlow looks</p>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                    <button className="p-4 border-2 border-primary bg-primary/5 rounded-lg">
                        <Icon name="Sun" size={24} className="mx-auto mb-2 text-primary" />
                        <p className="text-sm font-medium">Light</p>
                    </button>
                    <button className="p-4 border-2 border-border hover:border-primary rounded-lg transition-colors">
                        <Icon name="Moon" size={24} className="mx-auto mb-2" />
                        <p className="text-sm font-medium">Dark</p>
                    </button>
                    <button className="p-4 border-2 border-border hover:border-primary rounded-lg transition-colors">
                        <Icon name="Monitor" size={24} className="mx-auto mb-2" />
                        <p className="text-sm font-medium">System</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AppearanceSection;
