import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatSidebar from '../../components/ui/ChatSidebar';
import Button from '../../components/ui/Button';
import Icon from '../../components/Appicon';
import GroupInfoCard from './components/GroupInfoCard';
import MemberListItem from './components/MemberListItem';
import GroupSettingsContent from './components/GroupSettingsContent';
import DangerZoneContent from './components/DangerZoneContent';

// Mock group data
const groupInfo = {
    name: 'Project Team',
    icon: 'Users',
    createdOn: 'Dec 1, 2025',
    memberCount: 8,
    description: 'Main discussion group for project collaboration and updates'
};

const groupMembers = [
    {
        id: 1,
        name: 'John Doe',
        username: '@johndoe',
        role: 'Admin',
        joinedDate: 'Dec 1, 2025',
        isYou: true
    },
    {
        id: 2,
        name: 'Sarah Wilson',
        username: '@sarahw',
        role: 'Admin',
        joinedDate: 'Dec 1, 2025',
        isYou: false
    },
    {
        id: 3,
        name: 'Mike Johnson',
        username: '@mikej',
        role: 'Member',
        joinedDate: 'Dec 2, 2025',
        isYou: false
    },
    {
        id: 4,
        name: 'Emily Brown',
        username: '@emilyb',
        role: 'Member',
        joinedDate: 'Dec 2, 2025',
        isYou: false
    },
    {
        id: 5,
        name: 'David Lee',
        username: '@davidl',
        role: 'Member',
        joinedDate: 'Dec 2, 2025',
        isYou: false
    },
    {
        id: 6,
        name: 'Rachel Green',
        username: '@rachelg',
        role: 'Member',
        joinedDate: 'Dec 2, 2025',
        isYou: false
    }
];

const tabs = [
    { id: 'members', label: 'Members', icon: 'Users' },
    { id: 'settings', label: 'Settings', icon: 'Settings' },
    { id: 'danger', label: 'Danger Zone', icon: 'AlertTriangle' }
];

const GroupChatManagement = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('members');
    const [members, setMembers] = useState(groupMembers);

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleRoleChange = (memberId, newRole) => {
        setMembers(prevMembers =>
            prevMembers.map(member =>
                member.id === memberId ? { ...member, role: newRole } : member
            )
        );
    };

    const handleRemoveMember = (memberId) => {
        if (window.confirm('Are you sure you want to remove this member from the group?')) {
            setMembers(prevMembers => prevMembers.filter(member => member.id !== memberId));
        }
    };

    const handleClose = () => {
        navigate('/chat-dashboard');
    };

    const handleAddMembers = () => {
        navigate('/new-chat-creation');
    };

    return (
        <div className="h-screen flex overflow-hidden bg-background">
            <ChatSidebar
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
            />

            <main className="flex-1 flex flex-col lg:ml-[300px] overflow-hidden">
                {/* Header */}
                <div className="bg-card border-b border-border px-6 py-4 shadow-sm flex-shrink-0">
                    <div className="max-w-5xl mx-auto w-full">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors duration-200"
                                >
                                    <Icon name="Menu" size={20} className="text-foreground" />
                                </button>
                                <button
                                    onClick={handleClose}
                                    className="hidden lg:block p-2 hover:bg-muted rounded-lg transition-colors duration-200"
                                >
                                    <Icon name="X" size={20} className="text-foreground" />
                                </button>
                                <div>
                                    <h1 className="text-2xl font-semibold text-foreground">Group Management</h1>
                                    <p className="text-sm text-muted-foreground mt-0.5">
                                        Manage members and settings
                                    </p>
                                </div>
                            </div>
                            <Button variant="outline" onClick={handleClose}>
                                Close
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-5xl mx-auto px-6 py-8">
                        <GroupInfoCard groupInfo={groupInfo} />

                        {/* Tabs */}
                        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                            {/* Tab Headers */}
                            <div className="border-b border-border bg-muted/30">
                                <div className="flex overflow-x-auto">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`
                        flex items-center gap-2 px-6 py-4 font-medium transition-all duration-200 whitespace-nowrap
                        ${activeTab === tab.id
                                                    ? 'text-primary border-b-2 border-primary bg-card'
                                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                                }
                      `}
                                        >
                                            <Icon name={tab.icon} size={18} />
                                            <span>{tab.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tab Content */}
                            <div className="p-6">
                                {activeTab === 'members' && (
                                    <div className="space-y-6">
                                        {/* Actions Bar */}
                                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                                            <div className="relative flex-1 max-w-md w-full">
                                                <Icon
                                                    name="Search"
                                                    size={18}
                                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Search members..."
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-muted border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
                                                />
                                            </div>
                                            <Button iconName="UserPlus" onClick={handleAddMembers}>
                                                Add Members
                                            </Button>
                                        </div>

                                        {/* Members Count */}
                                        <div className="flex items-center justify-between pb-4 border-b border-border">
                                            <h3 className="text-lg font-semibold text-foreground">
                                                Group Members ({filteredMembers.length})
                                            </h3>
                                        </div>

                                        {/* Members List */}
                                        <div className="space-y-3">
                                            {filteredMembers.length > 0 ? (
                                                filteredMembers.map((member) => (
                                                    <MemberListItem
                                                        key={member.id}
                                                        member={member}
                                                        onRoleChange={handleRoleChange}
                                                        onRemove={handleRemoveMember}
                                                    />
                                                ))
                                            ) : (
                                                <div className="text-center py-12">
                                                    <Icon name="Users" size={48} className="mx-auto mb-3 text-muted-foreground opacity-50" />
                                                    <p className="text-muted-foreground">No members found</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'settings' && <GroupSettingsContent />}
                                {activeTab === 'danger' && <DangerZoneContent />}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default GroupChatManagement;
