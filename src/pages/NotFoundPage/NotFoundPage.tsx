import { Link } from 'react-router-dom';

import { Section } from '@/components/layout/Section/Section';

export default function NotFoundPage() {
    return (
        <main id="main-content">
            <Section theme="gradient">
                <p className="eyebrow">Error 404</p>

                <h1 className="displayHeading">
                    This page could not be found.
                </h1>

                <p className="lead">
                    The page may have moved, or the address may be incorrect.
                </p>

                <Link className="textLink" to="/">
                    Return home
                </Link>
            </Section>
        </main>
    );
}