import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/components/layout/RootLayout/RootLayout';

import HomePage from '@/pages/HomePage/HomePage';
import AboutPage from '@/pages/AboutPage/AboutPage';
import ServicesPage from '@/pages/ServicesPage/ServicesPage';
import PackagesPage from '@/pages/PackagesPage/PackagesPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';

const routerBaseName = import.meta.env.BASE_URL.replace(/\/$/, '');

export const router = createBrowserRouter(
    [
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
    ],
    {
        basename: routerBaseName,
    },
);