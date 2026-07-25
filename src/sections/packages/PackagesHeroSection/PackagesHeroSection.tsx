import { Link } from 'react-router-dom';

import { Section } from '@/components/layout/Section/Section';

import styles from './PackagesHeroSection.module.scss';

const accessibleRoles = [
    'Staff Accountant',
    'Controller',
    'Staff Accountant',
    'Senior Accountant',
    'FP&A Analyst',
    'Process Automation Specialist',
] as const;

const packages = [
    {
        number: '01',
        title: 'Essential Accounting',
        href: '/packages/essential-accounting',
    },
    {
        number: '02',
        title: 'Growth Finance',
        href: '/packages/growth-finance',
    },
    {
        number: '03',
        title: 'Strategic CFO Package',
        href: '/packages/strategic-cfo',
    },
] as const;

export function PackagesHeroSection() {
    return (
        <Section
            id="packages-overview"
            className={styles.section}
            contentClassName={styles.sectionContent}
            contained={false}
            fullHeight
        >
            <div className={styles.packagesPanel}>
                <div
                    className={styles.gradientOrb}
                    aria-hidden="true"
                />

                <div className={styles.intro}>
                    <h1>Find the right package for your journey</h1>

                    <p>
                        Whether you&apos;re building your financial
                        foundation, scaling operations, or seeking
                        executive-level financial leadership, Sun Nearshore
                        provides flexible solutions designed to evolve
                        alongside your business.
                    </p>

                    <p className={styles.emphasis}>
                        Unlike traditional service providers, Sun Nearshore
                        offers a fully integrated finance ecosystem designed
                        to support every stage of growth.
                    </p>

                    <div className={styles.access}>
                        <span>Clients gain access to:</span>
                        <div className={styles.roleList}>
                            {accessibleRoles.map((role, index) => (
                                <span key={`${role}-${index}`}>{role}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.packageArea}>
                    <p>
                        All working together through a single strategic
                        partnership.
                    </p>

                    <div className={styles.packageGrid}>
                        {packages.map((packageItem, index) => (
                            <Link
                                key={packageItem.number}
                                className={styles.packageCard}
                                data-palette={index + 1}
                                to={packageItem.href}
                            >
                                <span>{packageItem.number}</span>
                                <h2>{packageItem.title}</h2>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}
