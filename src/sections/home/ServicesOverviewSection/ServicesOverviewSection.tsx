import {
    Calculator,
    ChartNoAxesCombined,
    ClipboardList,
    UsersRound,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { Section } from '@/components/layout/Section/Section';

import styles from './ServicesOverviewSection.module.scss';

const services = [
    {
        title: 'Accounting Operations',
        tone: 'peach',
        Icon: Calculator,
        to: '/services/accounting-operations',
    },
    {
        title: 'Compliance Services',
        tone: 'purple',
        Icon: UsersRound,
        to: '/services/compliance-services',
    },
    {
        title: 'Financial Advisory',
        tone: 'purple',
        Icon: ClipboardList,
        to: '/services/financial-advisory',
    },
    {
        title: 'Technology & Automation',
        tone: 'peach',
        Icon: ChartNoAxesCombined,
        to: '/services/technology-automation',
    },
] as const;

const stats = [
    { value: '10+', label: 'Years of experience' },
    { value: '50+', label: 'Business supported' },
    { value: '99%', label: 'Client satisfaction' },
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
                    <p className={styles.eyebrow} data-snap-reveal>
                        Our Services
                    </p>

                    <h2 className={styles.heading} data-snap-reveal>
                        Our integrated service model spans every stage of the
                        finance function, from day-to-day accounting operations
                        to executive financial strategy. Explore the
                        capabilities that help businesses operate with greater
                        clarity, control, and confidence.
                    </h2>
                </div>

                <div className={styles.cardsGrid} aria-label="Services">
                    {services.map(({ title, tone, Icon, to }) => (
                        <div
                            key={title}
                            className={styles.serviceCardReveal}
                            data-snap-reveal
                        >
                            <Link
                                to={to}
                                className={styles.serviceCard}
                            >
                                <span
                                    className={`${styles.cardIcon} ${styles[tone]}`}
                                >
                                    <Icon aria-hidden="true" />
                                </span>
                                <h3>{title}</h3>
                                <span className={styles.cardArrow} aria-hidden="true">
                                    <span />
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>

                <div className={styles.statsPanel} data-snap-reveal>
                    {stats.map(({ value, label }) => (
                        <article key={value} className={styles.statItem}>
                            <strong>{value}</strong>
                            <span>{label}</span>
                        </article>
                    ))}
                </div>
            </div>
        </Section>
    );
}
