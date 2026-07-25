import { Link } from 'react-router-dom';

import { Section } from '@/components/layout/Section/Section';

import styles from './ServicesHeroSection.module.scss';

const services = [
    {
        title: 'Accounting Operations',
        description:
            'Manage the financial foundation of your business through bookkeeping, accounts payable and receivable, payroll administration, and month-end close support.',
        href: '#accounting-operations',
    },
    {
        title: 'Compliance Services',
        description:
            'Maintain confidence through financial reporting, audit readiness, tax support, internal controls, and risk management.',
        href: '#compliance-services',
    },
    {
        title: 'Financial Advisory',
        description:
            'Gain strategic insights through controller services, FP&A, forecasting, budgeting, KPI development, and fractional CFO leadership.',
        href: '#financial-advisory',
    },
    {
        title: 'Technology & Automation',
        description:
            'Modernize finance operations through workflow optimization, ERP support, intelligent automation, and scalable financial systems.',
        href: '#technology-automation',
    },
] as const;

export function ServicesHeroSection() {
    return (
        <Section
            id="services-overview"
            className={styles.section}
            contentClassName={styles.sectionContent}
            contained={false}
            fullHeight
        >
            <div className={styles.servicesPanel}>
                <div className={styles.intro}>
                    <h1>
                        <span>Our</span>
                        <span>Services</span>
                    </h1>

                    <p>
                        At Sun Nearshore, we build connected financial
                        ecosystems. By combining accounting operations,
                        compliance, strategic advisory, and intelligent
                        automation, we provide integrated finance operations
                        services designed to help businesses operate
                        efficiently, gain financial clarity, and scale with
                        confidence.
                    </p>
                </div>

                <div
                    className={styles.cards}
                    aria-label="Service categories"
                >
                    {services.map((service) => (
                        <article
                            key={service.title}
                            className={styles.card}
                        >
                            <h2>{service.title}</h2>
                            <p>{service.description}</p>
                            <Link to={service.href}>Learn more</Link>
                        </article>
                    ))}
                </div>
            </div>
        </Section>
    );
}
