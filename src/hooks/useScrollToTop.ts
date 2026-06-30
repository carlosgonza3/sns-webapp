import { useLayoutEffect } from 'react';

import { useLocation } from 'react-router-dom';

export function useScrollToTop() {
    const { pathname, hash } = useLocation();

    useLayoutEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        let firstFrameId = 0;
        let secondFrameId = 0;

        firstFrameId = window.requestAnimationFrame(() => {
            secondFrameId = window.requestAnimationFrame(() => {
                if (hash) {
                    const targetId = decodeURIComponent(hash.slice(1));
                    const targetElement = document.getElementById(targetId);

                    targetElement?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });

                    return;
                }

                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'auto',
                });
            });
        });

        return () => {
            window.cancelAnimationFrame(firstFrameId);
            window.cancelAnimationFrame(secondFrameId);
        };
    }, [pathname, hash]);
}