import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import logo from '@/assets/images/logo.png';
import { Section } from '@/components/layout/Section/Section';

import styles from './HomeHeroSection.module.scss';

export function HomeHeroSection() {
    return (
        <Section
            id="home"
            className={styles.section}
            contentClassName={styles.sectionContent}
            contained={false}
            snap
            fullHeight
        >
            <div className={styles.heroPanel}>
                <div className={styles.gradientLayer} aria-hidden="true">
                    <span className={styles.gradientOrbPrimary} />
                    <span className={styles.gradientOrbSecondary} />
                    <span className={styles.gradientOrbAccent} />
                </div>

                <div className={styles.heroGrid}>
                    <div
                        className={styles.logoColumn}
                        data-snap-reveal
                    >
                        <img
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
                            <span>
                                Technology-Enabled
                            </span>

                            <span>
                                Finance Operations
                            </span>

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