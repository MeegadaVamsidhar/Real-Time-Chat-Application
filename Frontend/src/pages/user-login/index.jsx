import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthenticationContainer from '../../components/ui/AuthenticationContainer';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import Icon from '../../components/Appicon';

const UserLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear errors when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        if (apiError) {
            setApiError('');
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
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
            await login({
                email: formData.email,
                password: formData.password
            });

            // Navigate to chat dashboard after successful login
            navigate('/chat-dashboard');
        } catch (error) {
            setApiError(error.message || 'Login failed. Please check your credentials.');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = (provider) => {
        console.log(`Login with ${provider}`);
        // Implement social login logic here
    };

    const handleForgotPassword = () => {
        console.log('Forgot password clicked');
        // Implement forgot password logic here
    };

    return (
        <AuthenticationContainer>
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-foreground mb-2">Welcome Back</h2>
                    <p className="text-sm text-muted-foreground">Sign in to continue to ChatFlow</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* API Error Message */}
                    {apiError && (
                        <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                            <p className="text-sm text-destructive text-center">{apiError}</p>
                        </div>
                    )}

                    {/* Email */}
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

                    {/* Password */}
                    <div className="space-y-1">
                        <Input
                            name="password"
                            type="password"
                            label="Password"
                            required
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                            error={errors.password}
                        />
                        <div className="text-right">
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-sm text-primary hover:underline transition-all duration-200"
                            >
                                Forgot password?
                            </button>
                        </div>
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center gap-2">
                        <Checkbox
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleInputChange}
                        />
                        <label className="text-sm text-foreground cursor-pointer select-none">
                            Remember me
                        </label>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        fullWidth
                        size="lg"
                        loading={loading}
                        className="mt-6"
                    >
                        Sign In
                    </Button>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="grid grid-cols-3 gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            onClick={() => handleSocialLogin('email')}
                            className="hover:bg-muted"
                        >
                            <Icon name="Mail" size={20} />
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            onClick={() => handleSocialLogin('github')}
                            className="hover:bg-muted"
                        >
                            <Icon name="Github" size={20} />
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            onClick={() => handleSocialLogin('chrome')}
                            className="hover:bg-muted"
                        >
                            <Icon name="Chrome" size={20} />
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticationContainer>
    );
};

export default UserLogin;
