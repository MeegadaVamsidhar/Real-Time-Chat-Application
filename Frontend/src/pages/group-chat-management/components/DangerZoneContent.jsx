import React from 'react';
import Button from 'components/ui/Button';
import Icon from 'components/Appicon';

const DangerZoneContent = () => {
    return (
        <div className="space-y-6">
            <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                <div className="flex items-start gap-3">
                    <Icon name="AlertTriangle" size={20} className="text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-semibold text-destructive mb-1">Caution</h4>
                        <p className="text-sm text-muted-foreground">
                            These actions are irreversible and may result in data loss.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Leave Group</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                        You will no longer have access to this group's messages and content.
                    </p>
                    <Button variant="outline" className="text-destructive hover:bg-destructive/10">
                        Leave Group
                    </Button>
                </div>

                <div className="p-4 border border-destructive/30 rounded-lg bg-destructive/5">
                    <h4 className="font-semibold text-destructive mb-2">Delete Group</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                        Permanently delete this group. This action cannot be undone and all messages will be lost.
                    </p>
                    <Button variant="destructive">
                        Delete Group
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DangerZoneContent;
