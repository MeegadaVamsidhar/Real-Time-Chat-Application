import React from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/Appicon';

const ProfileSection = ({ profileData, previewImage, fileInputRef, onInputChange, onFileChange, onSave, loading }) => {
    return (
        <div className="space-y-8">
            {/* Profile Header */}
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <Icon name="User" size={20} className="text-primary" />
                    <h2 className="text-2xl font-semibold text-foreground">Profile Information</h2>
                </div>
                <p className="text-muted-foreground">Update your personal information and profile picture</p>
            </div>

            {/* Profile Picture Section */}
            <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-primary/20 border-4 border-card shadow-lg">
                            {previewImage ? (
                                <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Icon name="User" size={40} color="var(--color-primary)" />
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors duration-200"
                        >
                            <Icon name="Camera" size={16} />
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={onFileChange}
                            className="hidden"
                        />
                    </div>

                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-1">{profileData.fullName}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{profileData.username}</p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                iconName="Upload"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Upload Photo
                            </Button>
                            {previewImage && (
                                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                    Remove
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Personal Information */}
            <div className="bg-card rounded-xl border border-border p-6 space-y-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Personal Details</h3>
                    <Button variant="outline" size="sm" iconName="Edit2">
                        Edit Profile
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        name="fullName"
                        label="Full Name"
                        value={profileData.fullName}
                        onChange={onInputChange}
                        placeholder="Enter your full name"
                    />
                    <Input
                        name="username"
                        label="Username"
                        value={profileData.username}
                        onChange={onInputChange}
                        placeholder="@username"
                    />
                </div>

                <Input
                    name="email"
                    type="email"
                    label="Email Address"
                    required
                    value={profileData.email}
                    onChange={onInputChange}
                    placeholder="your.email@example.com"
                    description="This email will be used for account recovery and notifications"
                />

                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Bio</label>
                    <textarea
                        name="bio"
                        value={profileData.bio}
                        onChange={onInputChange}
                        rows={4}
                        placeholder="Tell us about yourself..."
                        className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 resize-none"
                    />
                    <p className="text-xs text-muted-foreground">{profileData.bio.length}/500 characters</p>
                </div>

                <Input
                    name="phone"
                    type="tel"
                    label="Phone Number"
                    value={profileData.phone}
                    onChange={onInputChange}
                    placeholder="+1 (555) 000-0000"
                />
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-3">
                <Button variant="outline" size="lg">
                    Cancel
                </Button>
                <Button size="lg" loading={loading} onClick={onSave} iconName="Save">
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

export default ProfileSection;
