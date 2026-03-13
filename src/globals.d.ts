import React from 'react';
import 'react';

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'zap-button': any;
            'zap-input': any;
            'zap-card': any;
            'zap-checkbox': any;
            'zap-radio': any;
            'zap-badge': any;
            'zap-alert': any;
            'zap-skeleton': any;
            'zap-tabs': any;
            'zap-tab-item': any;
            'zap-accordion': any;
            'zap-accordion-item': any;
            'zap-switch': any;
            'zap-dialog': any;
            'zap-login': any;
        }
    }
}

declare global {
    interface Window {
        lucide: any;
    }
}

// Ensure this file is treated as a module
export { };
