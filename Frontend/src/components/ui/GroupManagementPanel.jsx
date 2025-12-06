import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';


const GroupManagementPanel = ({ 
  isOpen = false, 
  onClose = () => {},
  groupData = null,
  onUpdateGroup = () => {},
  onLeaveGroup = () => {}
}) => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [availableUsers] = useState([
    { id: 6, name: 'Alex Turner', username: '@alext', isOnline: true },
    { id: 7, name: 'Lisa Chen', username: '@lisac', isOnline: false },
    { id: 8, name: 'Tom Harris', username: '@tomh', isOnline: true },
  ]);

  useEffect(() => {
    if (groupData) {
      setGroupName(groupData?.name || '');
      setGroupDescription(groupData?.description || '');
      setMembers(groupData?.members || []);
    }
  }, [groupData]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const filteredUsers = availableUsers?.filter(user =>
    user?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    user?.username?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const handleAddMember = (user) => {
    if (!members?.find(m => m?.id === user?.id)) {
      setMembers([...members, { ...user, role: 'member' }]);
    }
  };

  const handleRemoveMember = (userId) => {
    setMembers(members?.filter(m => m?.id !== userId));
  };

  const handleUpdateRole = (userId, newRole) => {
    setMembers(members?.map(m => 
      m?.id === userId ? { ...m, role: newRole } : m
    ));
  };

  const handleSave = () => {
    const updatedGroup = {
      ...groupData,
      name: groupName,
      description: groupDescription,
      members: members
    };
    onUpdateGroup(updatedGroup);
    onClose();
  };

  const handleLeave = () => {
    if (window.confirm('Are you sure you want to leave this group?')) {
      onLeaveGroup(groupData?.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-end lg:items-center justify-center animate-fade-in">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full lg:max-w-2xl bg-card rounded-t-2xl lg:rounded-lg shadow-xl border border-border animate-slide-in-right lg:animate-scale-in max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Group Settings</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Manage group information and members
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
            aria-label="Close panel"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Group Name
            </label>
            <input
              type="text"
              placeholder="Enter group name..."
              value={groupName}
              onChange={(e) => setGroupName(e?.target?.value)}
              className="w-full px-4 py-2 bg-muted border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter group description..."
              value={groupDescription}
              onChange={(e) => setGroupDescription(e?.target?.value)}
              rows={3}
              className="w-full px-4 py-2 bg-muted border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 resize-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-foreground">
                Members ({members?.length})
              </label>
            </div>

            <div className="space-y-2 mb-4">
              {members?.map(member => (
                <div
                  key={member?.id}
                  className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Icon name="User" size={20} color="var(--color-primary)" />
                    </div>
                    {member?.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">{member?.name}</p>
                    <p className="text-xs text-muted-foreground">{member?.username}</p>
                  </div>
                  <select
                    value={member?.role}
                    onChange={(e) => handleUpdateRole(member?.id, e?.target?.value)}
                    className="px-3 py-1.5 bg-background border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="admin">Admin</option>
                    <option value="member">Member</option>
                  </select>
                  <button
                    onClick={() => handleRemoveMember(member?.id)}
                    className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors duration-200"
                    aria-label="Remove member"
                  >
                    <Icon name="UserMinus" size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Add Members
              </label>
              <div className="relative mb-3">
                <Icon 
                  name="Search" 
                  size={18} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full pl-10 pr-4 py-2 bg-muted border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
                />
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {filteredUsers?.map(user => {
                  const isMember = members?.find(m => m?.id === user?.id);
                  return (
                    <button
                      key={user?.id}
                      onClick={() => !isMember && handleAddMember(user)}
                      disabled={isMember}
                      className={`
                        w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                        ${isMember 
                          ? 'bg-muted/50 cursor-not-allowed opacity-50' :'hover:bg-muted border border-transparent'
                        }
                      `}
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Icon name="User" size={20} color="var(--color-primary)" />
                        </div>
                        {user?.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-sm text-foreground">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.username}</p>
                      </div>
                      {!isMember && (
                        <Icon name="UserPlus" size={18} color="var(--color-primary)" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border space-y-3">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium"
            >
              Save Changes
            </button>
          </div>
          <button
            onClick={handleLeave}
            className="w-full px-4 py-2.5 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-all duration-200 font-medium"
          >
            Leave Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupManagementPanel;