import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthenticationContainer from '../../components/ui/AuthenticationContainer';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import AvatarUpload from './components/AvatarUpload';
import SocialRegistration from './components/SocialRegistration';
import PasswordStrength from './components/PasswordStrength';

const UserRegistration = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePicture: null,
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (apiError) {
      setApiError('');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profilePicture: 'File size must be less than 5MB' }));
        return;
      }
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, profilePicture: 'Please select an image file' }));
        return;
      }
      setFormData(prev => ({ ...prev, profilePicture: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);

      setErrors(prev => ({ ...prev, profilePicture: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    // Generate username from email if not provided
    if (!formData.username) {
      const username = formData.email.split('@')[0];
      setFormData(prev => ({ ...prev, username }));
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setApiError('');

    try {
      // Generate username from email if not set
      const username = formData.username || formData.email.split('@')[0];

      await register({
        username,
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        avatar: previewImage || undefined
      });

      // Navigate to chat dashboard after successful registration
      navigate('/chat-dashboard');
    } catch (error) {
      setApiError(error.message || 'Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <AuthenticationContainer>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Create Account</h2>
          <p className="text-sm text-muted-foreground">Fill in your details to get started with ChatFlow</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* API Error Message */}
          {apiError && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
              <p className="text-sm text-destructive text-center">{apiError}</p>
            </div>
          )}

          <AvatarUpload
            previewImage={previewImage}
            onFileChange={handleFileChange}
            fileInputRef={fileInputRef}
            error={errors.profilePicture}
          />

          <Input
            name="fullName"
            label="Full Name"
            required
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />

          <Input
            name="email"
            type="email"
            label="Email Address"
            required
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
          />

          <div>
            <Input
              name="password"
              type="password"
              label="Password"
              required
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
            />
            <PasswordStrength password={formData.password} />
          </div>

          <Input
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            required
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
          />

          <div className="space-y-1">
            <div className="flex items-start gap-2">
              <Checkbox
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="mt-0.5"
              />
              <label className="text-sm text-foreground cursor-pointer select-none">
                I agree to the{' '}
                <a href="#" className="text-primary hover:underline">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
                <span className="text-destructive ml-1">*</span>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-sm text-destructive ml-6">{errors.agreeToTerms}</p>
            )}
          </div>

          <Button
            type="submit"
            fullWidth
            size="lg"
            loading={loading}
            className="mt-6"
          >
            Create Account
          </Button>

          <SocialRegistration onSocialLogin={handleSocialLogin} />
        </form>
      </div>
    </AuthenticationContainer>
  );
};

export default UserRegistration;
