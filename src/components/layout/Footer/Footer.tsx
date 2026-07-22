import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
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
            </div>
        </footer>
    );
}