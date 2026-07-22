import { Section } from '@/components/layout/Section/Section';

import styles from './ServicesOverviewSection.module.scss';

const services = [
    {
        title: 'Accounting Operations',
        dot: 'peach',
    },
    {
        title: 'Compliance Services',
        dot: 'purple',
    },
    {
        title: 'Financial Advisory',
        dot: 'purple',
    },
    {
        title: 'Technology & Automation',
        dot: 'peach',
    },
] as const;

const stats = [
    {
        value: '10+',
        label: 'Years of experience',
    },
    {
        value: '200+',
        label: 'Financial processes supported',
    },
    {
        value: '99%',
        label: 'Client-focused accuracy',
    },
] as const;

export function ServicesOverviewSection() {
    return (
        <Section
            id="services-preview"
            className={styles.section}
            contentClassName={styles.sectionContent}
            contained={false}
            fullHeight
        >
            <div className={styles.servicesPanel}>
                <div className={styles.intro}>
                    <p
                        className={styles.eyebrow}
                        data-snap-reveal
                    >
                        Our Services
                    </p>

                    <h2
                        className={styles.heading}
                        data-snap-reveal
                    >
                        Our integrated service model spans every stage of the finance function—from day-to-day accounting operations to executive financial strategy. Explore the capabilities that help businesses operate with greater clarity, control, and confidence.
                    </h2>
                </div>

                <div
                    className={styles.cardsGrid}
                    aria-label="Services"
                >
                    {services.map(
                        ({
                             title,
                             dot,
                         }) => (
                            <article
                                key={title}
                                className={styles.serviceCard}
                                data-snap-reveal
                            >
                                <span
                                    className={[
                                        styles.cardDot,
                                        dot === 'peach'
                                            ? styles.cardDotPeach
                                            : styles.cardDotPurple,
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                    aria-hidden="true"
                                />

                                <h3>{title}</h3>

                                <span
                                    className={styles.cardArrow}
                                    aria-hidden="true"
                                >
                                    →
                                </span>
                            </article>
                        ),
                    )}
                </div>

                <div
                    className={styles.statsPanel}
                    data-snap-reveal
                >
                    <div
                        className={styles.statsGlow}
                        aria-hidden="true"
                    />

                    {stats.map(
                        ({
                             value,
                             label,
                         }) => (
                            <article
                                key={value}
                                className={styles.statItem}
                            >
                                <strong>{value}</strong>
                                <span>{label}</span>
                            </article>
                        ),
                    )}
                </div>
            </div>
        </Section>
    );
}
