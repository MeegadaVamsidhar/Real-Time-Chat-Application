import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserLogin from './pages/user-login';
import UserProfileSettings from './pages/user-profile-settings';
import ChatDashboard from './pages/chat-dashboard';
import GroupChatManagement from './pages/group-chat-management';
import UserRegistration from './pages/user-registration';
import NewChatCreation from './pages/new-chat-creation';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-profile-settings" element={<UserProfileSettings />} />
        <Route path="/chat-dashboard" element={<ChatDashboard />} />
        <Route path="/group-chat-management" element={<GroupChatManagement />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/new-chat-creation" element={<NewChatCreation />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
