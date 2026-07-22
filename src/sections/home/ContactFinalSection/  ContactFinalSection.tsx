import { Link } from 'react-router-dom';

import ellipseTwo from '@/assets/images/ellipse-2.png';
import ellipseThree from '@/assets/images/ellipse-3.png';
import snsPurpleLogo from '@/assets/images/sns-purple.png';
import { Section } from '@/components/layout/Section/Section';

import styles from './ContactFinalSection.module.scss';

const navigationLinks = [
    {
        label: 'Home',
        to: '/',
    },
    {
        label: 'About Us',
        to: '/about',
    },
    {
        label: 'Services',
        to: '/services',
    },
    {
        label: 'Packages',
        to: '/packages',
    },
    {
        label: 'Contacts',
        to: '/#contact',
    },
] as const;

export function ContactFinalSection() {
    return (
        <Section
            id="contact"
            className={styles.section}
            contentClassName={styles.sectionContent}
            contained={false}
            fullHeight
        >
            <div className={styles.contactPanel}>
                <div
                    className={styles.radialStage}
                    aria-hidden="true"
                >
                    <img
                        className={`${styles.ellipse} ${styles.ellipseLarge}`}
                        src={ellipseTwo}
                        alt=""
                    />

                    <img
                        className={`${styles.ellipse} ${styles.ellipseSmall}`}
                        src={ellipseThree}
                        alt=""
                    />
                </div>

                <div className={styles.visualColumn}>
                    <div className={styles.visualContent}>
                        <div
                            className={styles.eyebrowGroup}
                            data-snap-reveal
                        >
                            <span className={styles.eyebrowLine} />
                            <p>Financial clarity, strategic growth.</p>
                        </div>

                        <h2
                            className={styles.heading}
                            data-snap-reveal
                        >
                            Let's build a financial future together
                        </h2>
                    </div>
                </div>

                <div className={styles.contentColumn}>
                    <img
                        className={styles.logoMark}
                        src={snsPurpleLogo}
                        alt="SNS"
                        data-snap-reveal
                    />

                    <div
                        className={styles.contentGrid}
                        data-snap-reveal
                    >
                        <p className={styles.statement}>
                            We combine financial expertise, technology, and
                            personalized support to simplify accounting and
                            give your business confidence to grow.
                        </p>

                        <nav
                            className={styles.footerNav}
                            aria-label="Footer navigation"
                        >
                            {navigationLinks.map(
                                ({
                                     label,
                                     to,
                                 }) => (
                                    <Link
                                        key={label}
                                        to={to}
                                    >
                                        {label}
                                    </Link>
                                ),
                            )}
                        </nav>

                        <address className={styles.address}>
                            <p>
                                <span>Oficina:</span>{' '}
                                <a href="https://maps.google.com/?q=Calle%20El%20Mirador%2C%20Pasaje%20Moraz%C3%A1n%2C%20%233060%2C%20Col.%20Escal%C3%B3n%2C%20San%20Salvador">
                                    Calle El Mirador, Pasaje Morazán, #3060,
                                    Col. Escalón, S.S.
                                </a>
                            </p>

                            <p>
                                <span>Horarios:</span> Lunes-Domingo / 9:00
                                a.m. - 6:00 p.m.
                            </p>

                            <p>
                                <span>Contacto:</span>{' '}
                                <a href="mailto:correoprueba@gmail.com">
                                    correoprueba@gmail.com
                                </a>
                            </p>

                            <p>
                                <span>Fijo:</span>{' '}
                                <a href="tel:+50322642525">
                                    2264 2525
                                </a>
                            </p>
                        </address>
                    </div>

                    <Link
                        className={styles.consultationButton}
                        to="/#contact"
                        data-snap-reveal
                    >
                        <span>Book a consultation</span>
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </Section>
    );
}
