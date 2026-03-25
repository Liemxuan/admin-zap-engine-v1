import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PageLogin, PageRegister, PageForgotPassword, PageResetPassword, PageActiveAccount } from '../features/auth';
import { PageDashboard } from '../features/dashboard';
import { PageProduct, PageCreateProduct } from '../features/product';
import { PageCategory } from '../features/category';
import { PageDiscount } from '../features/discount';
import { PageModifier } from '../features/modifier';
import { PageLocation } from '../features/location';
import { PageCustomer } from '../features/customer';
import { PageGroup } from '../features/group';
import { PageDiningOption } from '../features/dining-option';
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
                    {
                        path: 'category',
                        element: <PageCategory />,
                    },
                    {
                        path: 'discount',
                        element: <PageDiscount />,
                    },
                    {
                        path: 'modifier',
                        element: <PageModifier />,
                    },
                    {
                        path: 'location',
                        element: <PageLocation />,
                    },
                    {
                        path: 'customer',
                        element: <PageCustomer />,
                    },
                    {
                        path: 'group',
                        element: <PageGroup />,
                    },
                    {
                        path: 'dining-option',
                        element: <PageDiningOption />,
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
