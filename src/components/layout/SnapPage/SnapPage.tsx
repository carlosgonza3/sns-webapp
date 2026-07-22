import {
    type ReactNode,
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

            if (
                isDesktop &&
                !prefersReducedMotion &&
                sections.length >= 2
            ) {
                const firstSection = sections[0];
                const secondSection = sections[1];

                ScrollTrigger.create({
                    trigger: firstSection,
                    start: 'top top',
                    end: () =>
                        `+=${Math.max(
                            1,
                            secondSection.offsetTop -
                            firstSection.offsetTop,
                        )}`,
                    invalidateOnRefresh: true,
                    snap: {
                        snapTo: [0, 1],
                        delay: 0.08,
                        duration: {
                            min: 0.25,
                            max: 0.55,
                        },
                        ease: 'power2.inOut',
                        inertia: false,
                    },
                });
            }

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
