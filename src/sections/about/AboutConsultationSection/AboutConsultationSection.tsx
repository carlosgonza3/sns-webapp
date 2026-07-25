import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Section } from '@/components/layout/Section/Section';

import styles from './AboutConsultationSection.module.scss';

export function AboutConsultationSection() {
    return (
        <Section
            id="about-consultation"
            className={styles.section}
            contentClassName={styles.sectionContent}
            contained={false}
            fullHeight
        >
            <div className={styles.stage}>
                <div
                    className={styles.gradientCircle}
                    aria-hidden="true"
                />

                <h2 className={styles.circleHeading}>
                    <span>Ready to build a</span>
                    <span>smarter finance</span>
                    <span>function?</span>
                </h2>

                <div className={styles.calloutCircle}>
                    <p>
                        Gain the strategic support your
                        <br />
                        business needs to scale with
                        <br />
                        confidence.
                    </p>

                    <Link
                        className={styles.consultationButton}
                        to="/#contact"
                    >
                        <span>Consult an advisor</span>
                        <ArrowRight aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </Section>
    );
}
