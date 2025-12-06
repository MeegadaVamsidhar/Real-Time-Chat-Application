import React from 'react';

const PasswordStrength = ({ password }) => {
    const getStrength = (pwd) => {
        if (!pwd) return { level: 0, text: '', color: '' };

        let strength = 0;
        if (pwd.length >= 8) strength++;
        if (pwd.length >= 12) strength++;
        if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
        if (/\d/.test(pwd)) strength++;
        if (/[^a-zA-Z\d]/.test(pwd)) strength++;

        if (strength <= 2) return { level: 1, text: 'Weak', color: 'bg-destructive' };
        if (strength <= 3) return { level: 2, text: 'Fair', color: 'bg-warning' };
        if (strength <= 4) return { level: 3, text: 'Good', color: 'bg-accent' };
        return { level: 4, text: 'Strong', color: 'bg-success' };
    };

    const strength = getStrength(password);

    if (!password) return null;

    return (
        <div className="space-y-2 mt-2">
            <div className="flex gap-1">
                {[1, 2, 3, 4].map((level) => (
                    <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${level <= strength.level ? strength.color : 'bg-muted'
                            }`}
                    />
                ))}
            </div>
            {strength.text && (
                <p className="text-xs text-muted-foreground">
                    Password strength: <span className="font-medium">{strength.text}</span>
                </p>
            )}
        </div>
    );
};

export default PasswordStrength;
