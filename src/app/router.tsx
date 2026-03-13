import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PageLogin, PageRegister, PageForgotPassword, PageResetPassword, PageActiveAccount } from '../features/auth';
import { PageDashboard } from '../features/dashboard';
import { PageProduct, PageCreateProduct } from '../features/product';
import { LanguageGuard } from './LanguageGuard';

/**
 * Centrally managed router for the application.
 * All main routes are prefixed with /:lang (vi/en).
 * Root path redirects to /vi/login.
 */
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/vi/login" replace />,
    },
    {
        path: '/:lang',
        element: <LanguageGuard />,
        children: [
            {
                path: 'login',
                element: <PageLogin />,
            },
            {
                path: 'register',
                element: <PageRegister />,
            },
            {
                path: 'active-account',
                element: <PageActiveAccount />,
            },
            {
                path: 'forgot-password',
                element: <PageForgotPassword />,
            },
            {
                path: 'reset-password',
                element: <PageResetPassword />,
            },
            {
                path: ':merchantName',
                children: [
                    {
                        path: 'dashboard',
                        element: <PageDashboard />,
                    },
                    {
                        path: 'product',
                        element: <PageProduct />,
                    },
                    {
                        path: 'product/create',
                        element: <PageCreateProduct />,
                    },
                ]
            },
            {
                path: '', // For /vi or /en (defaults to login)
                element: <Navigate to="login" replace />,
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to="/vi/login" replace />,
    }
]);
