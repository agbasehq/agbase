import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="page" role="status">
            <div className="page-feedback text-center space-y-4">
                <span className="loading loading-ring loading-lg text-primary"></span>
                <p className="text-base-content/70">Loading AGBase...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;