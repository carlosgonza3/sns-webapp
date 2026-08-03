import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Section } from '@/components/layout/Section/Section';
import type { PackageDetail } from '@/content/packages';

import styles from './PackageDetailPage.module.scss';

type PackageDetailPageProps = {
    packageDetail: PackageDetail;
};

export default function PackageDetailPage({
    packageDetail,
}: PackageDetailPageProps) {
    return (
        <main id="main-content">
            <Section
                className={styles.section}
                contentClassName={styles.sectionContent}
                contained={false}
                fullHeight
            >
                <div className={styles.detailPanel}>
                    <article
                        className={styles.packageCard}
                        data-palette={packageDetail.palette}
                    >
                        <header>
                            <span>{packageDetail.number}</span>
                            <h1>{packageDetail.title}</h1>
                        </header>

                        <div className={styles.packageCopy}>
                            <p>{packageDetail.tagline}</p>
                            <p>{packageDetail.description}</p>
                        </div>

                        <div className={styles.included}>
                            <h2>What&apos;s Included:</h2>
                            <ul>
                                {packageDetail.included.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </article>

                    <aside className={styles.idealFor}>
                        <span aria-hidden="true" />
                        <h2>Ideal for:</h2>
                        <ul>
                            {packageDetail.idealFor.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>

                        <div className={styles.actions}>
                            <Link
                                className={styles.consultationButton}
                                to="/#contact"
                            >
                                <span>Book a consultation</span>
                                <ArrowRight aria-hidden="true" />
                            </Link>

                            <Link
                                className={styles.backButton}
                                to="/packages"
                            >
                                Back
                            </Link>
                        </div>
                    </aside>
                </div>
            </Section>
        </main>
    );
}
