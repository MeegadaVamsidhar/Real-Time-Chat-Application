import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../Appicon';

const AuthenticationContainer = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location?.pathname === '/user-login';

  const handleToggleAuth = () => {
    if (isLoginPage) {
      navigate('/user-registration');
    } else {
      navigate('/user-login');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Icon name="MessageSquare" size={36} color="var(--color-primary)" />
          </div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">ChatFlow</h1>
          <p className="text-muted-foreground">
            {isLoginPage ? 'Welcome back! Sign in to continue' : 'Create your account to get started'}
          </p>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          {children}
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            {isLoginPage ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={handleToggleAuth}
              className="text-primary font-medium hover:underline transition-all duration-200"
            >
              {isLoginPage ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        <div className="text-center mt-8 text-xs text-muted-foreground">
          <p>© 2025 ChatFlow. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationContainer;