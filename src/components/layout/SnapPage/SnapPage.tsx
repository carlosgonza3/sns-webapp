import {
    type ReactNode,
    useEffect,
    useRef,
} from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

import styles from './SnapPage.module.scss';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type SnapPageProps = {
    children: ReactNode;
    className?: string;
};

const DESKTOP_SNAP_QUERY = '(min-width: 48.01rem)';

function showRevealElements(elements: HTMLElement[]) {
    gsap.to(elements, {
        autoAlpha: 1,
        y: 0,
        duration: 0.95,
        stagger: 0.1,
        ease: 'power3.out',
        overwrite: 'auto',
    });
}

function resetRevealElements(elements: HTMLElement[]) {
    gsap.set(elements, {
        autoAlpha: 0,
        y: 42,
        overwrite: 'auto',
    });
}

export function SnapPage({
                             children,
                             className = '',
                         }: SnapPageProps) {
    const pageRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        const desktopSnapQuery = window.matchMedia(DESKTOP_SNAP_QUERY);

        const updateSnapClass = () => {
            document.documentElement.classList.toggle(
                'snapScrollEnabled',
                desktopSnapQuery.matches,
            );
        };

        updateSnapClass();

        desktopSnapQuery.addEventListener('change', updateSnapClass);

        return () => {
            desktopSnapQuery.removeEventListener(
                'change',
                updateSnapClass,
            );

            document.documentElement.classList.remove('snapScrollEnabled');
        };
    }, []);

    useGSAP(
        () => {
            const pageElement = pageRef.current;

            if (!pageElement) {
                return;
            }

            const isDesktop = window.matchMedia(DESKTOP_SNAP_QUERY).matches;

            const sections = gsap.utils.toArray<HTMLElement>(
                '[data-snap-section]',
                pageElement,
            );

            sections.forEach((section) => {
                const revealElements = gsap.utils.toArray<HTMLElement>(
                    '[data-snap-reveal]',
                    section,
                );

                if (revealElements.length === 0) {
                    return;
                }

                if (prefersReducedMotion || !isDesktop) {
                    gsap.set(revealElements, {
                        autoAlpha: 1,
                        y: 0,
                        clearProps: 'visibility',
                    });

                    return;
                }

                resetRevealElements(revealElements);

                ScrollTrigger.create({
                    trigger: section,
                    start: 'top 70%',
                    end: 'bottom 20%',
                    invalidateOnRefresh: true,
                    onEnter: () => {
                        showRevealElements(revealElements);
                    },
                    onEnterBack: () => {
                        showRevealElements(revealElements);
                    },
                    onLeave: () => {
                        resetRevealElements(revealElements);
                    },
                    onLeaveBack: () => {
                        resetRevealElements(revealElements);
                    },
                });
            });

            ScrollTrigger.refresh();
        },
        {
            scope: pageRef,
            dependencies: [prefersReducedMotion],
            revertOnUpdate: true,
        },
    );

    return (
        <div
            ref={pageRef}
            className={`${styles.snapPage} ${className}`.trim()}
        >
            {children}
        </div>
    );
}