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

export function SnapPage({
                             children,
                             className = '',
                         }: SnapPageProps) {
    const pageRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        document.documentElement.classList.add('snapScrollEnabled');

        return () => {
            document.documentElement.classList.remove('snapScrollEnabled');
        };
    }, []);

    useGSAP(
        () => {
            if (!pageRef.current) {
                return;
            }

            const sections = gsap.utils.toArray<HTMLElement>(
                '[data-snap-section]',
                pageRef.current,
            );

            sections.forEach((section) => {
                const revealElements =
                    section.querySelectorAll<HTMLElement>(
                        '[data-snap-reveal]',
                    );

                if (revealElements.length === 0) {
                    return;
                }

                if (prefersReducedMotion) {
                    gsap.set(revealElements, {
                        autoAlpha: 1,
                        clearProps: 'transform',
                    });

                    return;
                }

                gsap.fromTo(
                    revealElements,
                    {
                        autoAlpha: 0,
                        y: 48,
                    },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.12,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 72%',
                            once: true,
                        },
                    },
                );
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