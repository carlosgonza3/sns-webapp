import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { App } from '@/app/App';

import '@/styles/global.scss';

if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
}

if (!window.location.hash) {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto',
    });
}

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('The root application element could not be found.');
}

createRoot(rootElement).render(
    <StrictMode>
        <App />
    </StrictMode>,
);