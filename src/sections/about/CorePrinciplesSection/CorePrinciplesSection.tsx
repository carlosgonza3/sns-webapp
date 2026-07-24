import {
    useEffect,
    useState,
} from 'react';

import principleOne from '@/assets/images/core-principle-1.png';
import principleTwo from '@/assets/images/core-principle-2.png';
import principleThree from '@/assets/images/core-principle-3.png';
import { Section } from '@/components/layout/Section/Section';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

import styles from './CorePrinciplesSection.module.scss';

const principles = [
    'Trust',
    'Compliance',
    'Financial Intelligence',
    'Technology',
    'Operational Excellence',
] as const;

const principleImages = [
    {
        src: principleOne,
        alt: '',
    },
    {
        src: principleTwo,
        alt: '',
    },
    {
        src: principleThree,
        alt: '',
    },
] as const;

const imageSlots = [
    styles.slotTop,
    styles.slotCenter,
    styles.slotBottom,
] as const;

const ROTATION_INTERVAL = 3000;

export function CorePrinciplesSection() {
    const [activePrinciple, setActivePrinciple] = useState(2);
    const [imagePhase, setImagePhase] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [rotationCycle, setRotationCycle] = useState(0);
    const [hasRotated, setHasRotated] = useState(false);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (isPaused || prefersReducedMotion) {
            return;
        }

        const intervalId = window.setInterval(() => {
            setActivePrinciple(
                (current) => (current + 1) % principles.length,
            );
            setImagePhase((current) => (current + 1) % imageSlots.length);
            setHasRotated(true);
        }, ROTATION_INTERVAL);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [isPaused, prefersReducedMotion, rotationCycle]);

    const selectPrinciple = (index: number) => {
        if (index === activePrinciple) {
            return;
        }

        setActivePrinciple(index);
        setImagePhase((current) => (current + 1) % imageSlots.length);
        setRotationCycle((current) => current + 1);
        setHasRotated(true);
    };

    const wrappingImageIndex =
        (principleImages.length - imagePhase) % principleImages.length;

    return (
        <Section
            id="core-principles"
            className={styles.section}
            contentClassName={styles.sectionContent}
            contained={false}
            fullHeight
        >
            <div className={styles.principlesPanel}>
                <div className={styles.copyColumn}>
                    <div className={styles.eyebrow}>
                        <span aria-hidden="true" />
                        <h2>Our Core Principles</h2>
                    </div>

                    <p>
                        Our work is guided by principles that shape every
                        engagement, every recommendation, and every solution
                        we deliver. By combining financial expertise with
                        operational excellence and long-term thinking, we help
                        businesses build finance functions designed for
                        clarity and sustainable growth.
                    </p>
                </div>

                <div
                    className={styles.imageStage}
                    data-animated={hasRotated ? 'true' : 'false'}
                    aria-hidden="true"
                >
                    {principleImages.map((image, imageIndex) => {
                        const slotIndex =
                            (imageIndex + imagePhase) % imageSlots.length;

                        return (
                            <img
                                key={image.src}
                                className={`${styles.principleImage} ${
                                    imageIndex === 1
                                        ? styles.principleImageTwo
                                        : ''
                                } ${imageSlots[slotIndex]}`}
                                src={image.src}
                                alt={image.alt}
                            />
                        );
                    })}

                    {hasRotated ? (
                        <img
                            key={`exiting-${imagePhase}`}
                            className={`${styles.principleImage} ${styles.exitingBottom}`}
                            src={principleImages[wrappingImageIndex].src}
                            alt=""
                        />
                    ) : null}
                </div>

                <div
                    className={styles.principlesList}
                    aria-label="Core principles"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onFocus={() => setIsPaused(true)}
                    onBlur={(event) => {
                        if (
                            !event.currentTarget.contains(
                                event.relatedTarget as Node,
                            )
                        ) {
                            setIsPaused(false);
                        }
                    }}
                >
                    {principles.map((principle, index) => (
                        <button
                            key={principle}
                            className={styles.principleButton}
                            type="button"
                            aria-pressed={index === activePrinciple}
                            onClick={() => selectPrinciple(index)}
                        >
                            {principle}
                        </button>
                    ))}
                </div>
            </div>
        </Section>
    );
}
