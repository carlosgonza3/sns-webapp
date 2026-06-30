import { Link } from 'react-router-dom';

import { Container } from '@/components/layout/Container/Container';

import styles from './Footer.module.scss';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <Container className={styles.container}>
                <p>© {currentYear} SNS. All rights reserved.</p>

                <nav
                    className={styles.navigation}
                    aria-label="Footer navigation"
                >
                    <Link to="/about">About Us</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/packages">Packages</Link>
                    <Link to="/#contact">Contact</Link>
                </nav>
            </Container>
        </footer>
    );
}