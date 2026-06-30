import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/layout/Footer/Footer';
import { Header } from '@/components/layout/Header/Header';
import { useScrollToTop } from '@/hooks/useScrollToTop';

import styles from './RootLayout.module.scss';

export function RootLayout() {
    useScrollToTop();

    return (
        <div className={styles.site}>
            <a className={styles.skipLink} href="#main-content">
                Skip to main content
            </a>

            <Header />

            <div className={styles.page}>
                <Outlet />
            </div>

            <Footer />
        </div>
    );
}