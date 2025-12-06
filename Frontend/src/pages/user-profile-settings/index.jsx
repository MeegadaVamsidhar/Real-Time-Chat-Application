import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ChatSidebar from '../../components/ui/ChatSidebar';
import Icon from '../../components/Appicon';
import ProfileSection from './components/ProfileSection';
import SecuritySection from './components/SecuritySection';
import NotificationSection from './components/NotificationSection';
import AppearanceSection from './components/AppearanceSection';
import PrivacySection from './components/PrivacySection';

const UserProfileSettings = () => {
    const navigate = useNavigate();
    const { user, updateProfile } = useAuth();
    const fileInputRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [profileData, setProfileData] = useState({
        fullName: '',
        username: '',
        email: '',
        bio: '',
        phone: '',
        profilePicture: null
    });
    const [previewImage, setPreviewImage] = useState('/api/placeholder/200/200');
    const [loading, setLoading] = useState(false);

    const tabs = [
        { id: 'profile', label: 'Profile', icon: 'User' },
        { id: 'security', label: 'Security', icon: 'Shield' },
        { id: 'notifications', label: 'Notifications', icon: 'Bell' },
        { id: 'appearance', label: 'Appearance', icon: 'Palette' },
        { id: 'privacy', label: 'Privacy', icon: 'Lock' }
    ];

    useEffect(() => {
        if (user) {
            setProfileData({
                fullName: user.fullName || '',
                username: user.username || '',
                email: user.email || '',
                bio: user.bio || '',
                phone: user.phone || '',
                profilePicture: user.avatar || null
            });
            if (user.avatar) {
                setPreviewImage(user.avatar);
            }
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileData(prev => ({ ...prev, profilePicture: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = async () => {
        setLoading(true);
        try {
            await updateProfile({
                fullName: profileData.fullName,
                bio: profileData.bio,
                // Handle file upload separately if backend supports it directly or assume it's handled via another service
                // For now passing other fields
            });
            console.log('Profile updated successfully');
        } catch (error) {
            console.error('Failed to update profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBackToChat = () => {
        navigate('/chat-dashboard');
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <ProfileSection
                        profileData={profileData}
                        previewImage={previewImage}
                        fileInputRef={fileInputRef}
                        onInputChange={handleInputChange}
                        onFileChange={handleFileChange}
                        onSave={handleSaveProfile}
                        loading={loading}
                    />
                );
            case 'security':
                return <SecuritySection />;
            case 'notifications':
                return <NotificationSection />;
            case 'appearance':
                return <AppearanceSection />;
            case 'privacy':
                return <PrivacySection />;
            default:
                return null;
        }
    };

    return (
        <div className="h-screen flex overflow-hidden bg-background">
            <ChatSidebar
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
            />

            <main className="flex-1 flex flex-col lg:ml-[300px] overflow-hidden">
                {/* Header */}
                <div className="h-16 bg-card border-b border-border px-6 flex items-center justify-between shadow-sm flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleBackToChat}
                            className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
                        >
                            <Icon name="ArrowLeft" size={20} className="text-foreground" />
                        </button>
                        <div>
                            <h1 className="text-xl font-semibold text-foreground">Settings</h1>
                            <p className="text-xs text-muted-foreground">Manage your account and preferences</p>
                        </div>
                    </div>

                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors duration-200"
                    >
                        <Icon name="Menu" size={20} />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Sidebar Tabs */}
                    <aside className="w-64 bg-card border-r border-border overflow-y-auto flex-shrink-0 hidden md:block">
                        <nav className="p-4 space-y-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${activeTab === tab.id
                                            ? 'bg-primary text-primary-foreground shadow-md'
                                            : 'text-foreground hover:bg-muted'
                                        }
                  `}
                                >
                                    <Icon name={tab.icon} size={20} />
                                    <span className="font-medium">{tab.label}</span>
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Mobile Tab Selector */}
                    <div className="md:hidden w-full bg-card border-b border-border px-4 py-2">
                        <select
                            value={activeTab}
                            onChange={(e) => setActiveTab(e.target.value)}
                            className="w-full px-4 py-2 bg-muted border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                            {tabs.map((tab) => (
                                <option key={tab.id} value={tab.id}>
                                    {tab.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Main Settings Content */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="max-w-3xl mx-auto px-6 py-8">
                            {renderTabContent()}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserProfileSettings;
