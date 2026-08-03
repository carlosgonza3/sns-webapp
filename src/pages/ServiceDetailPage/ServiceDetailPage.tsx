import {
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

import {
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    Pause,
    Play,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { Section } from '@/components/layout/Section/Section';
import type { ServiceDetail } from '@/content/services';

import styles from './ServiceDetailPage.module.scss';

type ServiceDetailPageProps = {
    service: ServiceDetail;
};

const MOBILE_CAROUSEL_QUERY = '(max-width: 44rem)';
const CAROUSEL_AUTOPLAY_DELAY = 4_500;

export default function ServiceDetailPage({
    service,
}: ServiceDetailPageProps) {
    const [selectedCard, setSelectedCard] = useState(
        Math.min(1, service.cards.length - 1),
    );
    const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
    const cardStageRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
    const scrollIdleTimeoutRef = useRef<number | null>(null);
    const programmaticScrollTimeoutRef = useRef<number | null>(null);
    const isProgrammaticScrollRef = useRef(false);
    const isUserCarouselInteractionRef = useRef(false);

    useEffect(() => {
        const cardStage = cardStageRef.current;
        const selectedCardElement = cardRefs.current[selectedCard];
        const mobileCarouselQuery = window.matchMedia(MOBILE_CAROUSEL_QUERY);

        if (
            !cardStage ||
            !selectedCardElement ||
            !mobileCarouselQuery.matches
        ) {
            return;
        }

        const frameId = window.requestAnimationFrame(() => {
            if (scrollIdleTimeoutRef.current !== null) {
                window.clearTimeout(scrollIdleTimeoutRef.current);
                scrollIdleTimeoutRef.current = null;
            }

            if (programmaticScrollTimeoutRef.current !== null) {
                window.clearTimeout(programmaticScrollTimeoutRef.current);
            }

            const prefersReducedMotion = window.matchMedia(
                '(prefers-reduced-motion: reduce)',
            ).matches;
            const targetLeft =
                selectedCardElement.offsetLeft -
                (cardStage.clientWidth - selectedCardElement.offsetWidth) / 2;

            isProgrammaticScrollRef.current = true;
            isUserCarouselInteractionRef.current = false;
            cardStage.scrollTo({
                left: targetLeft,
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
            });

            programmaticScrollTimeoutRef.current = window.setTimeout(
                () => {
                    isProgrammaticScrollRef.current = false;
                    programmaticScrollTimeoutRef.current = null;
                },
                prefersReducedMotion ? 0 : 700,
            );
        });

        return () => {
            window.cancelAnimationFrame(frameId);
        };
    }, [selectedCard]);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        if (
            isAutoplayPaused ||
            prefersReducedMotion ||
            service.cards.length < 2
        ) {
            return;
        }

        let autoplayTimeout: number | null = null;

        const scheduleNextCard = () => {
            if (document.hidden) {
                return;
            }

            autoplayTimeout = window.setTimeout(() => {
                setSelectedCard(
                    (currentCard) =>
                        (currentCard + 1) % service.cards.length,
                );
            }, CAROUSEL_AUTOPLAY_DELAY);
        };

        const handleVisibilityChange = () => {
            if (autoplayTimeout !== null) {
                window.clearTimeout(autoplayTimeout);
                autoplayTimeout = null;
            }

            scheduleNextCard();
        };

        scheduleNextCard();
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            if (autoplayTimeout !== null) {
                window.clearTimeout(autoplayTimeout);
            }

            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange,
            );
        };
    }, [
        isAutoplayPaused,
        selectedCard,
        service.cards.length,
    ]);

    useEffect(() => {
        return () => {
            if (scrollIdleTimeoutRef.current !== null) {
                window.clearTimeout(scrollIdleTimeoutRef.current);
            }

            if (programmaticScrollTimeoutRef.current !== null) {
                window.clearTimeout(programmaticScrollTimeoutRef.current);
            }
        };
    }, []);

    useLayoutEffect(() => {
        const cardStage = cardStageRef.current;
        const mobileCarouselQuery = window.matchMedia(MOBILE_CAROUSEL_QUERY);

        if (!cardStage) {
            return;
        }

        let isDisposed = false;

        const updateCarouselHeight = () => {
            if (isDisposed) {
                return;
            }

            if (!mobileCarouselQuery.matches) {
                cardStage.style.removeProperty('height');
                return;
            }

            const rootFontSize =
                Number.parseFloat(
                    window.getComputedStyle(document.documentElement).fontSize,
                ) || 16;
            const cardStageStyle = window.getComputedStyle(cardStage);
            const stageVerticalPadding =
                Number.parseFloat(cardStageStyle.paddingTop) +
                Number.parseFloat(cardStageStyle.paddingBottom);
            const activeCardOffset = rootFontSize * 1.5;

            const expandedCardHeights = cardRefs.current
                .slice(0, service.cards.length)
                .map((card) => {
                    if (!card) {
                        return 0;
                    }

                    const cardStyle = window.getComputedStyle(card);
                    const heading = card.querySelector('h2');
                    const details = card.querySelector('ul');

                    return (
                        Number.parseFloat(cardStyle.paddingTop) +
                        Number.parseFloat(cardStyle.paddingBottom) +
                        (heading?.scrollHeight ?? 0) +
                        (details?.scrollHeight ?? 0) +
                        rootFontSize * 1.75
                    );
                });

            const tallestExpandedCard = Math.max(...expandedCardHeights, 0);

            cardStage.style.height = `${Math.ceil(
                tallestExpandedCard + stageVerticalPadding + activeCardOffset,
            )}px`;
        };

        updateCarouselHeight();
        window.addEventListener('resize', updateCarouselHeight);
        mobileCarouselQuery.addEventListener('change', updateCarouselHeight);

        document.fonts.ready.then(updateCarouselHeight);

        return () => {
            isDisposed = true;
            cardStage.style.removeProperty('height');
            window.removeEventListener('resize', updateCarouselHeight);
            mobileCarouselQuery.removeEventListener(
                'change',
                updateCarouselHeight,
            );
        };
    }, [service.cards.length]);

    const handleCarouselScroll = () => {
        if (
            !window.matchMedia(MOBILE_CAROUSEL_QUERY).matches ||
            isProgrammaticScrollRef.current ||
            !isUserCarouselInteractionRef.current
        ) {
            return;
        }

        if (scrollIdleTimeoutRef.current !== null) {
            window.clearTimeout(scrollIdleTimeoutRef.current);
        }

        scrollIdleTimeoutRef.current = window.setTimeout(() => {
            const cardStage = cardStageRef.current;

            if (!cardStage) {
                return;
            }

            const carouselCenter =
                cardStage.scrollLeft + cardStage.clientWidth / 2;
            let closestCard = selectedCard;
            let closestDistance = Number.POSITIVE_INFINITY;

            cardRefs.current.forEach((card, index) => {
                if (!card) {
                    return;
                }

                const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                const distance = Math.abs(cardCenter - carouselCenter);

                if (distance < closestDistance) {
                    closestCard = index;
                    closestDistance = distance;
                }
            });

            setSelectedCard(closestCard);
            isUserCarouselInteractionRef.current = false;
            scrollIdleTimeoutRef.current = null;
        }, 120);
    };

    return (
        <main id="main-content">
            <Section
                className={styles.section}
                contentClassName={styles.sectionContent}
                contained={false}
                fullHeight
            >
                <div className={styles.detailPanel}>
                    <div className={styles.introduction}>
                        <div className={styles.headingBlock}>
                            <span aria-hidden="true" />
                            <h1>{service.title}</h1>
                        </div>

                        <div className={styles.copy}>
                            {service.introduction.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}

                            <Link
                                className={styles.backButton}
                                to="/services"
                            >
                                <ArrowLeft aria-hidden="true" />
                                <span>Back</span>
                            </Link>
                        </div>
                    </div>

                    <div
                        ref={cardStageRef}
                        className={styles.cardStage}
                        aria-label={`${service.title} capabilities`}
                        aria-roledescription="carousel"
                        onPointerDown={() => {
                            isUserCarouselInteractionRef.current = true;
                        }}
                        onScroll={handleCarouselScroll}
                        onWheel={() => {
                            isUserCarouselInteractionRef.current = true;
                        }}
                    >
                        {service.cards.map((card, index) => (
                            <button
                                ref={(element) => {
                                    cardRefs.current[index] = element;
                                }}
                                key={card.title}
                                className={styles.serviceCard}
                                type="button"
                                data-palette={(index % 4) + 1}
                                aria-pressed={selectedCard === index}
                                onClick={() => setSelectedCard(index)}
                            >
                                <h2>{card.title}</h2>
                                <ul
                                    aria-hidden={selectedCard !== index}
                                    data-visible={selectedCard === index}
                                >
                                    {card.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </button>
                        ))}
                    </div>

                    <div
                        className={styles.carouselControls}
                        aria-label="Service capability carousel controls"
                    >
                        <button
                            type="button"
                            aria-label="Previous capability"
                            disabled={selectedCard === 0}
                            onClick={() => {
                                setSelectedCard((currentCard) =>
                                    Math.max(0, currentCard - 1),
                                );
                            }}
                        >
                            <ChevronLeft aria-hidden="true" />
                        </button>

                        <span aria-live="polite">
                            {selectedCard + 1} / {service.cards.length}
                        </span>

                        <button
                            type="button"
                            aria-label="Next capability"
                            disabled={selectedCard === service.cards.length - 1}
                            onClick={() => {
                                setSelectedCard((currentCard) =>
                                    Math.min(
                                        service.cards.length - 1,
                                        currentCard + 1,
                                    ),
                                );
                            }}
                        >
                            <ChevronRight aria-hidden="true" />
                        </button>

                        <button
                            type="button"
                            aria-label={
                                isAutoplayPaused
                                    ? 'Play automatic carousel'
                                    : 'Pause automatic carousel'
                            }
                            aria-pressed={isAutoplayPaused}
                            onClick={() => {
                                setIsAutoplayPaused((isPaused) => !isPaused);
                            }}
                        >
                            {isAutoplayPaused ? (
                                <Play aria-hidden="true" />
                            ) : (
                                <Pause aria-hidden="true" />
                            )}
                        </button>
                    </div>

                    <div
                        className={styles.indicators}
                        aria-hidden="true"
                    >
                        {service.cards.map((card, index) => (
                            <span
                                key={card.title}
                                data-active={selectedCard === index}
                            />
                        ))}
                    </div>

                    <button
                        className={styles.desktopAutoplayToggle}
                        type="button"
                        aria-label={
                            isAutoplayPaused
                                ? 'Play automatic cards'
                                : 'Pause automatic cards'
                        }
                        aria-pressed={isAutoplayPaused}
                        onClick={() => {
                            setIsAutoplayPaused((isPaused) => !isPaused);
                        }}
                    >
                        {isAutoplayPaused ? (
                            <Play aria-hidden="true" />
                        ) : (
                            <Pause aria-hidden="true" />
                        )}
                        <span>
                            {isAutoplayPaused ? 'Play' : 'Pause'} cards
                        </span>
                    </button>
                </div>
            </Section>
        </main>
    );
}
