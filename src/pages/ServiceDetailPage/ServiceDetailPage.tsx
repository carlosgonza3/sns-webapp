import { useState } from 'react';

import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Section } from '@/components/layout/Section/Section';
import type { ServiceDetail } from '@/content/services';

import styles from './ServiceDetailPage.module.scss';

type ServiceDetailPageProps = {
    service: ServiceDetail;
};

export default function ServiceDetailPage({
    service,
}: ServiceDetailPageProps) {
    const [selectedCard, setSelectedCard] = useState(
        Math.min(1, service.cards.length - 1),
    );

    return (
        <main id="main-content">
            <Section
                className={styles.section}
                contentClassName={styles.sectionContent}
                contained={false}
                fullHeight
            >
                <div className={styles.detailPanel}>
                    <div className={styles.introduction}>
                        <div className={styles.headingBlock}>
                            <span aria-hidden="true" />
                            <h1>{service.title}</h1>
                        </div>

                        <div className={styles.copy}>
                            {service.introduction.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>

                        <Link
                            className={styles.backButton}
                            to="/services"
                        >
                            <ArrowLeft aria-hidden="true" />
                            <span>Services</span>
                        </Link>
                    </div>

                    <div
                        className={styles.cardStage}
                        aria-label={`${service.title} capabilities`}
                    >
                        {service.cards.map((card, index) => (
                            <button
                                key={card.title}
                                className={styles.serviceCard}
                                type="button"
                                data-palette={(index % 4) + 1}
                                aria-pressed={selectedCard === index}
                                onClick={() => setSelectedCard(index)}
                            >
                                <h2>{card.title}</h2>
                                <ul>
                                    {card.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </button>
                        ))}
                    </div>

                    <div
                        className={styles.indicators}
                        aria-hidden="true"
                    >
                        {service.cards.map((card, index) => (
                            <span
                                key={card.title}
                                data-active={selectedCard === index}
                            />
                        ))}
                    </div>
                </div>
            </Section>
        </main>
    );
}
