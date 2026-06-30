import type { ReactNode } from 'react';

import { Container } from '@/components/layout/Container/Container';

import styles from './Section.module.scss';

export type SectionTheme =
    | 'light'
    | 'dark'
    | 'blue'
    | 'green'
    | 'gradient';

type SectionProps = {
    children: ReactNode;
    id?: string;
    className?: string;
    contentClassName?: string;
    theme?: SectionTheme;
    background?: ReactNode;
    contained?: boolean;
    snap?: boolean;
    fullHeight?: boolean;
};

export function Section({
                            children,
                            id,
                            className = '',
                            contentClassName = '',
                            theme = 'light',
                            background,
                            contained = true,
                            snap = false,
                            fullHeight = false,
                        }: SectionProps) {
    const sectionClassName = [
        styles.section,
        snap ? styles.snapSection : '',
        fullHeight ? styles.fullHeight : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const content = contained ? (
        <Container
            className={`${styles.content} ${contentClassName}`.trim()}
        >
            {children}
        </Container>
    ) : (
        <div
            className={`${styles.content} ${contentClassName}`.trim()}
        >
            {children}
        </div>
    );

    return (
        <section
            id={id}
            className={sectionClassName}
            data-section-theme={theme}
            data-snap-section={snap ? '' : undefined}
        >
            {background ? (
                <div
                    className={styles.background}
                    aria-hidden="true"
                >
                    {background}
                </div>
            ) : null}

            {content}
        </section>
    );
}