import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { App } from '@/app/App';

import '@/styles/global.scss';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('The root application element could not be found.');
}

createRoot(rootElement).render(
    <StrictMode>
        <App />
    </StrictMode>,
);