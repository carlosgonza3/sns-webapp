import {
    useEffect,
    useLayoutEffect,
} from 'react';

import { useLocation } from 'react-router-dom';

const MAX_HASH_SCROLL_ATTEMPTS = 12;

function scrollToHashTarget(hash: string) {
    const targetId = decodeURIComponent(hash.slice(1));
    const targetElement = document.getElementById(targetId);

    if (!targetElement) {
        return false;
    }

    targetElement.scrollIntoView({
        behavior: 'auto',
        block: 'start',
    });

    return true;
}

export function useScrollToTop() {
    const { pathname, hash } = useLocation();

    useLayoutEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        let frameId = 0;
        let attempts = 0;

        const applyScrollPosition = () => {
            if (!hash) {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'auto',
                });
                return;
            }

            if (scrollToHashTarget(hash)) {
                return;
            }

            attempts += 1;

            if (attempts < MAX_HASH_SCROLL_ATTEMPTS) {
                frameId =
                    window.requestAnimationFrame(applyScrollPosition);
            }
        };

        frameId = window.requestAnimationFrame(applyScrollPosition);

        return () => {
            window.cancelAnimationFrame(frameId);
        };
    }, [pathname, hash]);

    useEffect(() => {
        const handleSameHashClick = (event: MouseEvent) => {
            if (!(event.target instanceof Element)) {
                return;
            }

            const anchor = event.target.closest<HTMLAnchorElement>(
                'a[href]',
            );

            if (!anchor) {
                return;
            }

            const destination = new URL(anchor.href);

            if (
                destination.origin !== window.location.origin ||
                destination.pathname !== window.location.pathname ||
                !destination.hash ||
                destination.hash !== window.location.hash
            ) {
                return;
            }

            window.requestAnimationFrame(() => {
                scrollToHashTarget(destination.hash);
            });
        };

        document.addEventListener('click', handleSameHashClick);

        return () => {
            document.removeEventListener('click', handleSameHashClick);
        };
    }, [pathname, hash]);
}
