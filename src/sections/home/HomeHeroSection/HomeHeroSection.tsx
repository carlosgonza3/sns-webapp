import {
    useEffect,
    useRef,
} from 'react';

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

function getElementBounds(
    element: HTMLElement,
): ElementBounds {
    const bounds = element.getBoundingClientRect();

    return {
        top: bounds.top,
        left: bounds.left,
        width: bounds.width,
        height: bounds.height,
    };
}

function interpolate(
    start: number,
    end: number,
    progress: number,
) {
    return start + (end - start) * progress;
}

export function HomeHeroSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const sourceLogoRef = useRef<HTMLImageElement>(null);
    const floatingLogoRef = useRef<HTMLImageElement>(null);

    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        const htmlElement = document.documentElement;
        const bodyElement = document.body;

        const previousHtmlOverscroll =
            htmlElement.style.overscrollBehaviorY;

        const previousBodyOverscroll =
            bodyElement.style.overscrollBehaviorY;

        htmlElement.style.overscrollBehaviorY = 'none';
        bodyElement.style.overscrollBehaviorY = 'none';

        return () => {
            htmlElement.style.overscrollBehaviorY =
                previousHtmlOverscroll;

            bodyElement.style.overscrollBehaviorY =
                previousBodyOverscroll;
        };
    }, []);

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

            let isDestroyed = false;
            let isInitialized = false;
            let firstFrameId = 0;
            let secondFrameId = 0;

            const animationState = {
                progress: 0,
            };

            let progressTween: gsap.core.Tween | null = null;
            let scrollTrigger: ScrollTrigger | null = null;
            let resizeObserver: ResizeObserver | null = null;

            gsap.set(sourceLogo, {
                autoAlpha: 1,
            });

            gsap.set(floatingLogo, {
                autoAlpha: 0,
            });

            gsap.set(headerLogo, {
                autoAlpha: 0,
            });

            const renderFloatingLogo = (
                progress: number,
            ): boolean => {
                const sourceBounds =
                    getElementBounds(sourceLogo);

                const targetBounds =
                    getElementBounds(headerTarget);

                if (
                    sourceBounds.width <= 0 ||
                    sourceBounds.height <= 0 ||
                    targetBounds.width <= 0 ||
                    targetBounds.height <= 0
                ) {
                    return false;
                }

                const safeProgress = gsap.utils.clamp(
                    0,
                    1,
                    progress,
                );

                gsap.set(floatingLogo, {
                    top: interpolate(
                        sourceBounds.top,
                        targetBounds.top,
                        safeProgress,
                    ),
                    left: interpolate(
                        sourceBounds.left,
                        targetBounds.left,
                        safeProgress,
                    ),
                    width: interpolate(
                        sourceBounds.width,
                        targetBounds.width,
                        safeProgress,
                    ),
                    height: interpolate(
                        sourceBounds.height,
                        targetBounds.height,
                        safeProgress,
                    ),
                    autoAlpha: 1,
                    x: 0,
                    y: 0,
                });

                return true;
            };

            const initializeAnimation = () => {
                if (isDestroyed || isInitialized) {
                    return;
                }

                const wasPositioned =
                    renderFloatingLogo(0);

                if (!wasPositioned) {
                    return;
                }

                isInitialized = true;

                gsap.set(sourceLogo, {
                    autoAlpha: 0,
                });

                if (prefersReducedMotion) {
                    return;
                }

                progressTween = gsap.to(animationState, {
                    progress: 1,
                    paused: true,
                    ease: 'none',
                    onUpdate: () => {
                        renderFloatingLogo(
                            animationState.progress,
                        );
                    },
                });

                scrollTrigger = ScrollTrigger.create({
                    trigger: sectionElement,
                    start: 'top top',
                    end: () =>
                        `+=${window.innerHeight * 0.55}`,
                    animation: progressTween,
                    scrub: 0.65,
                    invalidateOnRefresh: true,
                    fastScrollEnd: false,

                    onRefresh: (trigger) => {
                        animationState.progress =
                            trigger.progress;

                        renderFloatingLogo(
                            animationState.progress,
                        );
                    },
                });

                resizeObserver = new ResizeObserver(() => {
                    renderFloatingLogo(
                        animationState.progress,
                    );
                });

                resizeObserver.observe(sourceLogo);
                resizeObserver.observe(headerTarget);

                ScrollTrigger.refresh();
            };

            const scheduleInitialization = () => {
                firstFrameId =
                    window.requestAnimationFrame(() => {
                        secondFrameId =
                            window.requestAnimationFrame(
                                () => {
                                    initializeAnimation();
                                },
                            );
                    });
            };

            if (sourceLogo.complete) {
                sourceLogo
                    .decode()
                    .catch(() => undefined)
                    .finally(scheduleInitialization);
            } else {
                sourceLogo.addEventListener(
                    'load',
                    scheduleInitialization,
                    {
                        once: true,
                    },
                );
            }

            const handleViewportResize = () => {
                if (!isInitialized) {
                    initializeAnimation();
                    return;
                }

                renderFloatingLogo(
                    animationState.progress,
                );

                ScrollTrigger.refresh();
            };

            window.addEventListener(
                'resize',
                handleViewportResize,
            );

            window.visualViewport?.addEventListener(
                'resize',
                handleViewportResize,
            );

            document.fonts.ready.then(() => {
                if (isDestroyed) {
                    return;
                }

                if (!isInitialized) {
                    initializeAnimation();
                    return;
                }

                renderFloatingLogo(
                    animationState.progress,
                );

                ScrollTrigger.refresh();
            });

            return () => {
                isDestroyed = true;

                window.cancelAnimationFrame(firstFrameId);
                window.cancelAnimationFrame(secondFrameId);

                sourceLogo.removeEventListener(
                    'load',
                    scheduleInitialization,
                );

                window.removeEventListener(
                    'resize',
                    handleViewportResize,
                );

                window.visualViewport?.removeEventListener(
                    'resize',
                    handleViewportResize,
                );

                resizeObserver?.disconnect();
                scrollTrigger?.kill();
                progressTween?.kill();

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
                        data-floating-logo
                    />,
                    document.body,
                )}

                <div
                    className={styles.gradientLayer}
                    aria-hidden="true"
                >
                    <span
                        className={
                            styles.gradientOrbPrimary
                        }
                    />

                    <span
                        className={
                            styles.gradientOrbSecondary
                        }
                    />

                    <span
                        className={
                            styles.gradientOrbAccent
                        }
                    />
                </div>

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
                            <span
                                className={styles.eyebrowLine}
                            />

                            <span>
                                Your strategic finance partner
                            </span>
                        </div>

                        <h1
                            className={styles.heading}
                            data-snap-reveal
                        >
                            <span>
                                Technology-Enabled
                            </span>

                            <span>
                                Finance Operations
                            </span>

                            <span
                                className={
                                    styles.headingAccent
                                }
                            >
                                &amp; Advisory Partner
                            </span>
                        </h1>

                        <p
                            className={styles.description}
                            data-snap-reveal
                        >
                            We deliver the financial
                            infrastructure, reporting, and
                            executive-level guidance companies
                            need without the cost and complexity
                            of building an internal finance
                            department.
                        </p>

                        <div
                            className={styles.actions}
                            data-snap-reveal
                        >
                            <Link
                                className={
                                    styles.primaryAction
                                }
                                to="/#contact"
                            >
                                <span>
                                    Schedule a Consultation
                                </span>

                                <ArrowRight aria-hidden="true" />
                            </Link>

                            <Link
                                className={
                                    styles.secondaryAction
                                }
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