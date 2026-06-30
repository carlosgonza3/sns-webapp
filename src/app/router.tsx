import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/components/layout/RootLayout/RootLayout';
import AboutPage from '@/pages/AboutPage/AboutPage';
import HomePage from '@/pages/HomePage/HomePage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import PackagesPage from '@/pages/PackagesPage/PackagesPage';
import ServicesPage from '@/pages/ServicesPage/ServicesPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'about',
                element: <AboutPage />,
            },
            {
                path: 'services',
                element: <ServicesPage />,
            },
            {
                path: 'packages',
                element: <PackagesPage />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
]);