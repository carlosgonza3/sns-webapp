import {
    useEffect,
    useRef,
    useState,
} from 'react';

import { Section } from '@/components/layout/Section/Section';

import styles from './DifferenceCarouselSection.module.scss';

const cards = [
    {
        title: 'Nearshore Talent',
        description:
            'Access experienced finance professionals through a cost-efficient and scalable delivery model.',
    },
    {
        title: 'Strategic Advisory',
        description:
            'Beyond reporting, we provide insights and leadership that support business growth.',
    },
    {
        title: 'Compliance Expertise',
        description:
            'Build confidence through strong controls, reporting standards, and regulatory support.',
    },
    {
        title: 'Intelligent Automation',
        description:
            'Modern tools and streamlined workflows reduce manual processes and improve efficiency.',
    },
    {
        title: 'Personalized Support',
        description:
            'A responsive partnership tailored to your goals, challenges, and stage of growth.',
    },
] as const;

const CYCLE_DURATION = 5000;

type CardPosition = 'previous' | 'active' | 'next' | 'hidden';

function getCardPosition(
    cardIndex: number,
    activeIndex: number,
): CardPosition {
    const relativeIndex =
        (cardIndex - activeIndex + cards.length) % cards.length;

    if (relativeIndex === 0) {
        return 'active';
    }

    if (relativeIndex === 1) {
        return 'next';
    }

    if (relativeIndex === cards.length - 1) {
        return 'previous';
    }

    return 'hidden';
}

export function DifferenceCarouselSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const remainingTimeRef = useRef(CYCLE_DURATION);

    useEffect(() => {
        if (isPaused) {
            return;
        }

        const duration = remainingTimeRef.current;
        const startedAt = window.performance.now();
        let completed = false;

        const timeoutId = window.setTimeout(() => {
            completed = true;
            remainingTimeRef.current = CYCLE_DURATION;
            setActiveIndex((current) => (current + 1) % cards.length);
        }, duration);

        return () => {
            window.clearTimeout(timeoutId);

            if (!completed) {
                const elapsed = window.performance.now() - startedAt;
                remainingTimeRef.current = Math.max(0, duration - elapsed);
            }
        };
    }, [activeIndex, isPaused]);

    const togglePaused = () => {
        setIsPaused((current) => !current);
    };

    return (
        <Section
            id="what-makes-us-different"
            className={styles.section}
            contentClassName={styles.sectionContent}
            contained={false}
            fullHeight
        >
            <div className={styles.differencePanel}>
                <div className={styles.intro}>
                    <div className={styles.eyebrow}>
                        <span aria-hidden="true" />
                        <p>What Makes Us Different</p>
                    </div>

                    <h2>
                        We provide Enterprise-Level Support and personalized
                        Partnership.
                    </h2>
                </div>

                <div className={styles.carouselLayout}>
                    <div
                        className={styles.carouselViewport}
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {cards.map((card, index) => {
                            const position = getCardPosition(
                                index,
                                activeIndex,
                            );

                            return (
                                <article
                                    key={card.title}
                                    className={styles.card}
                                    data-position={position}
                                    aria-hidden={position !== 'active'}
                                >
                                    <div className={styles.cardContent}>
                                        <h3>{card.title}</h3>
                                        <p>{card.description}</p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    <div className={styles.controls}>
                        <div
                            className={styles.progressShell}
                            aria-label={`Card ${activeIndex + 1} of ${cards.length}`}
                        >
                            <div className={styles.progressTrack}>
                                <span
                                    key={activeIndex}
                                    className={styles.progressFill}
                                    data-paused={isPaused ? 'true' : 'false'}
                                />
                            </div>
                        </div>

                        <button
                            className={styles.pauseButton}
                            type="button"
                            aria-label={
                                isPaused
                                    ? 'Resume card rotation'
                                    : 'Pause card rotation'
                            }
                            aria-pressed={isPaused}
                            onClick={togglePaused}
                        >
                            <span
                                className={
                                    isPaused
                                        ? styles.playIcon
                                        : styles.pauseIcon
                                }
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </Section>
    );
}
