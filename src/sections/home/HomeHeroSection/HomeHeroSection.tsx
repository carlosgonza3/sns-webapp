import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

import logo from '@/assets/images/logo.png';
import { Section } from '@/components/layout/Section/Section';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

import styles from './HomeHeroSection.module.scss';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ElementBounds = {
    top: number;
    left: number;
    width: number;
    height: number;
};

function getElementBounds(element: HTMLElement): ElementBounds {
    const bounds = element.getBoundingClientRect();

    return {
        top: bounds.top,
        left: bounds.left,
        width: bounds.width,
        height: bounds.height,
    };
}

export function HomeHeroSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const sourceLogoRef = useRef<HTMLImageElement>(null);
    const floatingLogoRef = useRef<HTMLImageElement>(null);

    const prefersReducedMotion = usePrefersReducedMotion();

    useGSAP(
        () => {
            const sectionElement = sectionRef.current;
            const sourceLogo = sourceLogoRef.current;
            const floatingLogo = floatingLogoRef.current;

            const headerLogo =
                document.querySelector<HTMLImageElement>(
                    '[data-header-logo]',
                );

            const headerTarget =
                document.querySelector<HTMLElement>(
                    '[data-header-logo-target]',
                );

            if (
                !sectionElement ||
                !sourceLogo ||
                !floatingLogo ||
                !headerLogo ||
                !headerTarget
            ) {
                return;
            }

            const placeAtSource = () => {
                const sourceBounds = getElementBounds(sourceLogo);

                gsap.set(floatingLogo, {
                    top: sourceBounds.top,
                    left: sourceBounds.left,
                    width: sourceBounds.width,
                    height: sourceBounds.height,
                    autoAlpha: 1,
                    x: 0,
                    y: 0,
                });
            };

            /*
             * On Home, the real Hero and Header images remain as invisible
             * layout markers. The floating image is the only visible logo.
             */
            gsap.set(sourceLogo, {
                autoAlpha: 0,
            });

            gsap.set(headerLogo, {
                autoAlpha: 0,
            });

            placeAtSource();

            if (prefersReducedMotion) {
                return;
            }

            const logoTween = gsap.to(floatingLogo, {
                top: () => getElementBounds(headerTarget).top,
                left: () => getElementBounds(headerTarget).left,
                width: () => getElementBounds(headerTarget).width,
                height: () => getElementBounds(headerTarget).height,
                ease: 'none',
                paused: true,
            });

            const scrollTrigger = ScrollTrigger.create({
                trigger: sectionElement,
                start: 'top top',
                end: () => `+=${window.innerHeight * 0.55}`,
                scrub: 0.65,
                animation: logoTween,
                invalidateOnRefresh: true,
                fastScrollEnd: false,
                onRefreshInit: () => {
                    /*
                     * Recalculate the starting box after responsive layout
                     * changes without forcing the animation to either end.
                     */
                    placeAtSource();
                },
            });

            const handleResize = () => {
                ScrollTrigger.refresh();
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                scrollTrigger.kill();
                logoTween.kill();

                gsap.set(sourceLogo, {
                    clearProps: 'opacity,visibility',
                });

                gsap.set(headerLogo, {
                    clearProps: 'opacity,visibility',
                });

                gsap.set(floatingLogo, {
                    clearProps:
                        'top,left,width,height,opacity,visibility,transform',
                });
            };
        },
        {
            scope: sectionRef,
            dependencies: [prefersReducedMotion],
            revertOnUpdate: true,
        },
    );

    return (
        <Section
            id="home"
            className={styles.section}
            contentClassName={styles.sectionContent}
            contained={false}
            snap
            fullHeight
        >
            <div
                ref={sectionRef}
                className={styles.heroPanel}
            >
                {createPortal(
                    <img
                        ref={floatingLogoRef}
                        className={styles.floatingLogo}
                        src={logo}
                        alt=""
                        aria-hidden="true"
                    />,
                    document.body,
                )}

                <div className={styles.heroGrid}>
                    <div
                        className={styles.logoColumn}
                        data-snap-reveal
                    >
                        <img
                            ref={sourceLogoRef}
                            className={styles.heroLogo}
                            src={logo}
                            alt=""
                            aria-hidden="true"
                        />
                    </div>

                    <div className={styles.contentColumn}>
                        <div
                            className={styles.eyebrow}
                            data-snap-reveal
                        >
                            <span className={styles.eyebrowLine} />

                            <span>
                                Your strategic finance partner
                            </span>
                        </div>

                        <h1
                            className={styles.heading}
                            data-snap-reveal
                        >
                            <span>Technology-Enabled</span>
                            <span>Finance Operations</span>

                            <span className={styles.headingAccent}>
                                &amp; Advisory Partner
                            </span>
                        </h1>

                        <p
                            className={styles.description}
                            data-snap-reveal
                        >
                            We deliver the financial infrastructure,
                            reporting, and executive-level guidance
                            companies need without the cost and
                            complexity of building an internal finance
                            department.
                        </p>

                        <div
                            className={styles.actions}
                            data-snap-reveal
                        >
                            <Link
                                className={styles.primaryAction}
                                to="/#contact"
                            >
                                <span>
                                    Schedule a Consultation
                                </span>

                                <ArrowRight aria-hidden="true" />
                            </Link>

                            <Link
                                className={styles.secondaryAction}
                                to="/#operations"
                            >
                                Learn more
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}