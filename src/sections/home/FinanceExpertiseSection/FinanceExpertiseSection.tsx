import { Section } from '@/components/layout/Section/Section';

import styles from './FinanceExpertiseSection.module.scss';

type ProcessStep = {
    number: string;
    label: string;
    active?: boolean;
};

const processSteps: ProcessStep[] = [
    {
        number: '01',
        label: 'Assess',
    },
    {
        number: '02',
        label: 'Implement',
        active: true,
    },
    {
        number: '03',
        label: 'Scale',
    },
];

export function FinanceExpertiseSection() {
    return (
        <Section
            id="operations"
            className={styles.section}
            contentClassName={styles.sectionContent}
            contained={false}
            snap
            fullHeight
        >
            <div className={styles.expertisePanel}>
                <div
                    className={styles.backgroundGlow}
                    aria-hidden="true"
                />

                <div className={styles.intro}>
                    <h2
                        className={styles.introHeading}
                        data-snap-reveal
                    >
                        Finance Expertise That Drives Better Business
                        Decisions.
                    </h2>

                    <p
                        className={styles.introLead}
                        data-snap-reveal
                    >
                        As operations become more complex, finance becomes
                        more than a back-office function. It becomes the
                        foundation for sustainable growth.
                    </p>

                    <p
                        className={styles.introStatement}
                        data-snap-reveal
                    >
                        Through experienced nearshore professionals, modern
                        financial technology, and intelligent automation, we
                        help businesses build the financial foundation that
                        provides greater clarity, stronger controls, and
                        strategic insight to grow with confidence.
                    </p>
                </div>

                <div className={styles.workflowPanel}>
                    <div
                        className={styles.workflowIntro}
                        data-snap-reveal
                    >
                        <span className={styles.eyebrowLine} />

                        <p className={styles.eyebrow}>
                            How we work
                        </p>

                        <h3 className={styles.workflowHeading}>
                            <span>Build.</span>
                            <span>Optimize.</span>
                            <span>Scale.</span>
                        </h3>
                    </div>

                    <article
                        className={`${styles.card} ${styles.supportCard}`}
                        data-snap-reveal
                    >
                        <p>
                            We help businesses move beyond transactional
                            accounting and build finance functions that
                            support scalability.
                        </p>
                    </article>

                    <article
                        className={`${styles.card} ${styles.processCard}`}
                        data-snap-reveal
                    >
                        <h4>
                            How We
                            <br />
                            Work
                        </h4>

                        <div className={styles.processList}>
                            {processSteps.map(
                                ({
                                     number,
                                     label,
                                     active = false,
                                 }) => (
                                    <div
                                        key={number}
                                        className={[
                                            styles.processStep,
                                            active
                                                ? styles.processStepActive
                                                : '',
                                        ]
                                            .filter(Boolean)
                                            .join(' ')}
                                    >
                                        <span>{number}</span>
                                        <strong>{label}</strong>
                                    </div>
                                ),
                            )}
                        </div>
                    </article>

                    <article
                        className={`${styles.card} ${styles.solutionCard}`}
                        data-snap-reveal
                    >
                        <p>
                            We deploy the right combination of accounting
                            support, compliance processes, and leadership
                            tailored to your business needs.
                        </p>
                    </article>
                </div>
            </div>
        </Section>
    );
}