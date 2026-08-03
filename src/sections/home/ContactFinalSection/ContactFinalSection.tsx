import { Clock3, Mail, MapPin, Phone, UserRound } from 'lucide-react';

import contactGradientDark from '@/assets/images/contact-gradient-dark.png';
import contactGradientLight from '@/assets/images/contact-gradient-light.png';
import snsPurpleLogo from '@/assets/images/sns-purple.png';
import { Section } from '@/components/layout/Section/Section';

import styles from './ContactFinalSection.module.scss';

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
                <div className={styles.visualColumn}>
                    <div className={styles.gradientOrb} aria-hidden="true">
                        <img
                            className={`${styles.gradientLayer} ${styles.gradientDark}`}
                            src={contactGradientDark}
                            alt=""
                        />
                        <img
                            className={`${styles.gradientLayer} ${styles.gradientLight}`}
                            src={contactGradientLight}
                            alt=""
                        />
                    </div>
                    <div className={styles.visualContent}>
                        <div className={styles.eyebrowGroup} data-snap-reveal>
                            <span />
                            <p>Financial clarity, strategic growth.</p>
                        </div>
                        <h2 className={styles.heading} data-snap-reveal>
                            Let&apos;s build a<br />
                            financial future<br />
                            together
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
                    <address className={styles.contactDetails} data-snap-reveal>
                        <div className={styles.detailItem}>
                            <h3><MapPin aria-hidden="true" /> Office address:</h3>
                            <a href="https://maps.google.com/?q=Coral%20Gables%2C%20Miami%2C%20FL%2060611">
                                Coral Gables, example address, Miami, FL. 60611
                            </a>
                        </div>
                        <div className={styles.detailItem}>
                            <h3><Clock3 aria-hidden="true" /> Schedule:</h3>
                            <p>Monday-Friday / 9:00 a.m. - 5:00 p.m.</p>
                        </div>
                        <div className={styles.detailItem}>
                            <h3><Mail aria-hidden="true" /> Email:</h3>
                            <a href="mailto:snsexample@gmail.com">snsexample@gmail.com</a>
                        </div>
                        <div className={styles.detailItem}>
                            <h3><Phone aria-hidden="true" /> Phone:</h3>
                            <a href="tel:+12222222222">US: +1 (222) 222-2222</a>
                        </div>
                        <div className={styles.detailItem}>
                            <h3><UserRound aria-hidden="true" /> Socials:</h3>
                        </div>
                    </address>
                </div>
            </div>
        </Section>
    );
}
