import { useEffect, useState } from 'react';

import { ArrowRight, Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

import logo from '@/assets/images/logo.png';
import { Container } from '@/components/layout/Container/Container';

import styles from './Header.module.scss';

const navigationItems = [
    {
        label: 'Home',
        to: '/',
        end: true,
    },
    {
        label: 'About Us',
        to: '/about',
        end: false,
    },
    {
        label: 'Services',
        to: '/services',
        end: false,
    },
    {
        label: 'Packages',
        to: '/packages',
        end: false,
    },
] as const;

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = isMenuOpen ? 'hidden' : '';

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isMenuOpen]);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen((currentState) => !currentState);
    };

    return (
        <header className={styles.header}>
            <Container className={styles.container}>
                <Link
                    className={styles.logoLink}
                    to="/"
                    aria-label="SNS home"
                    onClick={closeMenu}
                >
                    <img
                        className={styles.logo}
                        src={logo}
                        alt="SNS"
                    />
                </Link>

                <nav
                    id="primary-navigation"
                    className={`${styles.navigation} ${
                        isMenuOpen ? styles.navigationOpen : ''
                    }`}
                    aria-label="Primary navigation"
                >
                    {navigationItems.map(({ label, to, end }) => (
                        <NavLink
                            key={to}
                            className={({ isActive }) =>
                                `${styles.navigationLink} ${
                                    isActive
                                        ? styles.navigationLinkActive
                                        : ''
                                }`
                            }
                            end={end}
                            to={to}
                            onClick={closeMenu}
                        >
                            {label}
                        </NavLink>
                    ))}

                    <Link
                        className={styles.navigationLink}
                        to="/#contact"
                        onClick={closeMenu}
                    >
                        Contacts
                    </Link>

                    <Link
                        className={styles.mobileCta}
                        to="/#contact"
                        onClick={closeMenu}
                    >
                        <span>Book a Consultation</span>
                        <ArrowRight aria-hidden="true" />
                    </Link>
                </nav>

                <Link
                    className={styles.desktopCta}
                    to="/#contact"
                    onClick={closeMenu}
                >
                    <span>Book a Consultation</span>
                    <ArrowRight aria-hidden="true" />
                </Link>

                <button
                    className={styles.menuButton}
                    type="button"
                    aria-label={
                        isMenuOpen
                            ? 'Close navigation menu'
                            : 'Open navigation menu'
                    }
                    aria-controls="primary-navigation"
                    aria-expanded={isMenuOpen}
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? (
                        <X aria-hidden="true" />
                    ) : (
                        <Menu aria-hidden="true" />
                    )}
                </button>
            </Container>
        </header>
    );
}