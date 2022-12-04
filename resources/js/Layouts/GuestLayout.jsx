import React from 'react';

export default function GuestLayout({ children }) {
    return (
            <div style={{backgroundImage: "radial-gradient(circle at center top, rgb(117, 51, 11), rgb(25, 33, 44), rgb(14, 19, 31) 100%) !important"}}>
                <div className="filament-login-page flex items-center justify-center min-h-screen bg-gray-100 text-gray-900 py-12 dark:bg-gray-900 dark:text-white"
                >
                    {children}
                </div>
            </div>
    );
}
