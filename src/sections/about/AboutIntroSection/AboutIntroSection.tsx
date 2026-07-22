import { useState } from 'react';

import { Section } from '@/components/layout/Section/Section';

import styles from './AboutIntroSection.module.scss';

const placeholderCopy =
    'Sun Nearshore was created to help growing businesses access enterprise-level financial expertise without the cost and complexity of building an internal finance department. Through a connected ecosystem of people, technology, automation, and strategic leadership, we help organizations operate with greater clarity, efficiency, and confidence.';

const panels = [
    {
        id: 'vision',
        label: 'Vision',
        tone: 'coral',
        content: placeholderCopy,
    },
    {
        id: 'mission',
        label: 'Mission',
        tone: 'cream',
        content: placeholderCopy,
    },
    {
        id: 'about-us',
        label: 'About Us',
        tone: 'lilac',
        content: placeholderCopy,
    },
] as const;

type PanelId = (typeof panels)[number]['id'];

export function AboutIntroSection() {
    const [activePanel, setActivePanel] =
        useState<PanelId>('about-us');

    return (
        <Section
            className={styles.section}
            contentClassName={styles.sectionContent}
            contained={false}
            fullHeight
        >
            <div className={styles.aboutPanel}>
                <div
                    className={styles.cards}
                    aria-label="About Sun Nearshore"
                >
                    {panels.map((panel) => {
                        const isActive = panel.id === activePanel;
                        const contentId = `${panel.id}-content`;

                        return (
                            <article
                                key={panel.id}
                                className={`${styles.card} ${styles[panel.tone]}`}
                                data-active={isActive ? 'true' : 'false'}
                            >
                                <button
                                    className={styles.cardTrigger}
                                    type="button"
                                    aria-expanded={isActive}
                                    aria-controls={contentId}
                                    onClick={() =>
                                        setActivePanel(panel.id)
                                    }
                                >
                                    <span className={styles.cardLabel}>
                                        {panel.label}
                                    </span>
                                </button>

                                <div
                                    id={contentId}
                                    className={styles.cardContent}
                                    aria-hidden={!isActive}
                                >
                                    {isActive ? (
                                        <p>{panel.content}</p>
                                    ) : null}
                                </div>
                            </article>
                        );
                    })}
                </div>

                <p className={styles.closingStatement}>
                    More Than Accounting, We are a Connected Financial
                    Ecosystem..
                </p>
            </div>
        </Section>
    );
}
