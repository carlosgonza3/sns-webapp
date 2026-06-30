import { useEffect, useState } from 'react';

import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

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
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';

        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const handleMenuToggle = () => {
        setIsMenuOpen((currentState) => !currentState);
    };

    const handleNavigation = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className={styles.header}>
            <Container className={styles.container}>
                <NavLink
                    className={styles.brand}
                    to="/"
                    aria-label="SNS home"
                    onClick={handleNavigation}
                >
                    SNS
                </NavLink>

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
                            onClick={handleNavigation}
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>

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
                    onClick={handleMenuToggle}
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