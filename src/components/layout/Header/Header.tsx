import { useEffect, useRef, useState } from 'react';

import { ArrowRight, Menu, X } from 'lucide-react';
import {
    Link,
    NavLink,
    useLocation,
} from 'react-router-dom';

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

const MOBILE_NAVIGATION_QUERY = '(max-width: 56rem)';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileNavigation, setIsMobileNavigation] = useState(() =>
        window.matchMedia(MOBILE_NAVIGATION_QUERY).matches,
    );
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const { pathname } = useLocation();

    const isHomePage = pathname === '/';

    useEffect(() => {
        if (!isMenuOpen || !isMobileNavigation) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isMenuOpen, isMobileNavigation]);

    useEffect(() => {
        const navigationQuery = window.matchMedia(MOBILE_NAVIGATION_QUERY);

        const handleNavigationBreakpoint = () => {
            setIsMobileNavigation(navigationQuery.matches);

            if (!navigationQuery.matches) {
                setIsMenuOpen(false);
            }
        };

        handleNavigationBreakpoint();
        navigationQuery.addEventListener('change', handleNavigationBreakpoint);

        return () => {
            navigationQuery.removeEventListener('change', handleNavigationBreakpoint);
        };
    }, []);

    useEffect(() => {
        if (!isMenuOpen) {
            return;
        }

        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') {
                return;
            }

            setIsMenuOpen(false);
            window.requestAnimationFrame(() => menuButtonRef.current?.focus());
        };

        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const floatingLogo =
            document.querySelector<HTMLElement>(
                '[data-floating-logo]',
            );

        if (!floatingLogo) {
            return;
        }

        const previousVisibility =
            floatingLogo.style.visibility;

        floatingLogo.style.visibility = isMenuOpen
            ? 'hidden'
            : '';

        return () => {
            floatingLogo.style.visibility =
                previousVisibility;
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
                    data-header-logo-target
                >
                    <img
                        className={[
                            styles.logo,
                            isHomePage ? styles.logoHome : '',
                        ]
                            .filter(Boolean)
                            .join(' ')}
                        src={logo}
                        alt="SNS"
                        data-header-logo
                    />
                </Link>

                <nav
                    id="primary-navigation"
                    className={`${styles.navigation} ${
                        isMenuOpen
                            ? styles.navigationOpen
                            : ''
                    }`}
                    aria-label="Primary navigation"
                    aria-hidden={isMobileNavigation && !isMenuOpen}
                    inert={isMobileNavigation && !isMenuOpen}
                >
                    <Link
                        className={styles.mobileMenuLogo}
                        to="/"
                        aria-label="SNS home"
                        onClick={closeMenu}
                    >
                        <img
                            src={logo}
                            alt="SNS"
                        />
                    </Link>

                    {navigationItems.map(
                        ({ label, to, end }) => (
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
                        ),
                    )}

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
                    ref={menuButtonRef}
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
