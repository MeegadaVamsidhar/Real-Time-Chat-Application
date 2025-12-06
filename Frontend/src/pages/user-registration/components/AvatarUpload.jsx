import React from 'react';
import Icon from '../../../components/Appicon';

const AvatarUpload = ({ previewImage, onFileChange, fileInputRef, error }) => {
    return (
        <div className="flex flex-col items-center space-y-2">
            <label className="text-sm font-medium text-foreground mb-2">
                Profile Picture <span className="text-muted-foreground">(Optional)</span>
            </label>
            <div
                onClick={() => fileInputRef.current?.click()}
                className="relative w-24 h-24 rounded-full border-2 border-dashed border-border hover:border-primary transition-all duration-200 cursor-pointer group overflow-hidden"
            >
                {previewImage ? (
                    <>
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                            <Icon name="Camera" size={24} color="white" />
                        </div>
                    </>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-muted group-hover:bg-muted/80 transition-colors duration-200">
                        <Icon name="Upload" size={24} className="text-muted-foreground mb-1" />
                        <span className="text-xs text-muted-foreground">Upload</span>
                    </div>
                )}
            </div>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="hidden"
            />
            <p className="text-xs text-muted-foreground text-center">
                Supports: JPG, PNG, GIF (Max 5MB)
            </p>
            {error && (
                <p className="text-xs text-destructive">{error}</p>
            )}
        </div>
    );
};

export default AvatarUpload;
