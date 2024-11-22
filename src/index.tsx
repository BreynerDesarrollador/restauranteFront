import React from 'react';
import ReactDOM from 'react-dom/client';
import {AuthProvider, useAuth} from '@context/authContext';
import {AppRoutes} from '@utilidad/AppRoutes'
import axios from 'axios';
import {funcionesGenerales} from "@utilidad/funcionesGenerales"
import type {ThemeConfig} from 'antd';
import {theme, ConfigProvider} from 'antd';

import './App.css'
import './assets/css/bootstrap.min.css';
import './assets/css/boxicons.min.css'
import './assets/css/LineIcons.2.0.css';
import './assets/css/animate.css';
import './assets/css/tiny-slider.css';
import './assets/css/glightbox.min.css';
import './assets/css/main.css';

const {getDesignToken, useToken} = theme;

const config: ThemeConfig = {
    token: {
        colorPrimary: '#1890ff',
    },
};
const globalToken = getDesignToken(config);
// By hook
const App = () => {
    const {token} = useToken();
    return null;
};
funcionesGenerales.configAxios(axios);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <ConfigProvider theme={config}>
        <AuthProvider >
            <AppRoutes/>
        </AuthProvider>
    </ConfigProvider>
);
