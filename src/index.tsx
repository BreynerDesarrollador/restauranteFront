import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from '@context/authContext';
import {AppRoutes} from '@utilidad/AppRoutes'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <AuthProvider>
        <AppRoutes />
    </AuthProvider>
);
