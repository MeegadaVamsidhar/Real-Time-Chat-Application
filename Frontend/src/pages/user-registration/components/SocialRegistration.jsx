import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/Appicon';

const SocialRegistration = ({ onSocialLogin }) => {
    return (
        <>
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
                    onClick={() => onSocialLogin('email')}
                    className="hover:bg-muted"
                >
                    <Icon name="Mail" size={20} />
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => onSocialLogin('github')}
                    className="hover:bg-muted"
                >
                    <Icon name="Github" size={20} />
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => onSocialLogin('chrome')}
                    className="hover:bg-muted"
                >
                    <Icon name="Chrome" size={20} />
                </Button>
            </div>
        </>
    );
};

export default SocialRegistration;
