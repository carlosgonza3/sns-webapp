import { useEffect, useRef, useState } from 'react';

import { Section } from '@/components/layout/Section/Section';

import styles from './FinanceExpertiseSection.module.scss';

type ProcessStep = {
    number: string;
    label: string;
    description: string;
    icon: 'assess' | 'implement' | 'scale';
};

const processSteps: ProcessStep[] = [
    {
        number: '01',
        label: 'Assess',
        description:
            'We evaluate your current finance position and operational challenges to identify opportunities for improvement.',
        icon: 'assess',
    },
    {
        number: '02',
        label: 'Implement',
        description:
            'We build the accounting support, compliance processes, and financial systems tailored to your business needs.',
        icon: 'implement',
    },
    {
        number: '03',
        label: 'Scale',
        description:
            'We create a finance function with scalable systems designed to support sustainable long-term business growth.',
        icon: 'scale',
    },
];

const expertiseStatement =
    'Through experienced nearshore professionals and intelligent automation, we help businesses build the financial foundation that provides greater clarity, stronger controls, and strategic insight to grow with confidence.';

function StepIcon({ icon }: Pick<ProcessStep, 'icon'>) {
    if (icon === 'assess') {
        return (
            <svg viewBox="0 0 48 48" aria-hidden="true">
                <circle cx="20" cy="20" r="12" />
                <path d="m29 29 10 10" />
            </svg>
        );
    }

    if (icon === 'implement') {
        return (
            <svg viewBox="0 0 48 48" aria-hidden="true">
                <circle cx="23" cy="25" r="15" />
                <circle cx="23" cy="25" r="9" />
                <circle cx="23" cy="25" r="3" />
                <path d="m23 25 13-13M32 8l4 4 5-5-4-4-5 5Z" />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
            <path d="M8 39h33M12 35v-8h7v8M22 35V21h7v14M32 35V14h7v21M10 22l10-9 7 4L39 6M32 6h7v7" />
        </svg>
    );
}

export function FinanceExpertiseSection() {
    const statementRef = useRef<HTMLParagraphElement>(null);
    const [typedStatement, setTypedStatement] = useState(() =>
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? expertiseStatement
            : '',
    );

    useEffect(() => {
        const statement = statementRef.current;

        if (!statement) {
            return;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        let typingTimer: number | undefined;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    return;
                }

                observer.disconnect();
                let characterIndex = 0;

                typingTimer = window.setInterval(() => {
                    characterIndex += 4;
                    setTypedStatement(
                        expertiseStatement.slice(0, characterIndex),
                    );

                    if (characterIndex >= expertiseStatement.length) {
                        window.clearInterval(typingTimer);
                    }
                }, 16);
            },
            { threshold: 0.35 },
        );

        observer.observe(statement);

        return () => {
            observer.disconnect();
            window.clearInterval(typingTimer);
        };
    }, []);

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
                <div className={styles.intro}>
                    <div className={styles.backgroundGlow} aria-hidden="true" />

                    <h2 className={styles.introHeading} data-snap-reveal>
                        Finance Expertise That Drives Better Business Decisions.
                    </h2>

                    <span className={styles.introLine} aria-hidden="true" />

                    <p className={styles.introLead} data-snap-reveal>
                        As operations become more complex, finance becomes more
                        than a back-office function. It becomes the foundation
                        for sustainable growth.
                    </p>

                    <p
                        ref={statementRef}
                        className={styles.introStatement}
                        data-snap-reveal
                        aria-label={expertiseStatement}
                    >
                        <span aria-hidden="true">{typedStatement}</span>
                        {typedStatement.length < expertiseStatement.length ? (
                            <span
                                className={styles.typingCursor}
                                aria-hidden="true"
                            />
                        ) : null}
                    </p>
                </div>

                <div className={styles.workflowPanel}>
                    <div className={styles.workflowIntro} data-snap-reveal>
                        <span className={styles.eyebrowLine} aria-hidden="true" />
                        <h3>How we work</h3>
                        <p>
                            We help businesses move beyond transactional
                            accounting and build finance functions that support
                            scalability.
                        </p>
                    </div>

                    <div className={styles.processCards}>
                        {processSteps.map((step) => (
                            <div
                                key={step.number}
                                className={styles.processCardReveal}
                                data-snap-reveal
                            >
                                <article
                                    className={`${styles.processCard} ${styles[`card${step.number}`]}`}
                                >
                                    <div className={styles.cardHeader}>
                                        <span>{step.number}</span>
                                        <StepIcon icon={step.icon} />
                                    </div>
                                    <h4>{step.label}</h4>
                                    <p>{step.description}</p>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}
