import { Section } from '@/components/layout/Section/Section';
import { SnapPage } from '@/components/layout/SnapPage/SnapPage';
import { HomeHeroSection } from '@/sections/home/HomeHeroSection/HomeHeroSection';

export default function HomePage() {
    return (
        <main id="main-content">
            <SnapPage>
                <HomeHeroSection />

                <Section
                    id="operations"
                    theme="light"
                    snap
                    fullHeight
                >
                    <p
                        className="eyebrow"
                        data-snap-reveal
                    >
                        Better operations
                    </p>

                    <h2
                        className="sectionHeading"
                        data-snap-reveal
                    >
                        Financial processes designed to move your
                        business forward.
                    </h2>

                    <p
                        className="lead"
                        data-snap-reveal
                    >
                        Clear workflows, dependable reporting, and
                        technology that supports your team instead of
                        slowing it down.
                    </p>
                </Section>

                <Section
                    id="services-preview"
                    theme="blue"
                    snap
                    fullHeight
                >
                    <p
                        className="eyebrow"
                        data-snap-reveal
                    >
                        Services
                    </p>

                    <h2
                        className="sectionHeading"
                        data-snap-reveal
                    >
                        The right financial support at every stage of
                        growth.
                    </h2>

                    <p
                        className="lead"
                        data-snap-reveal
                    >
                        From daily finance operations to strategic
                        insight, our services adapt to the needs of your
                        organization.
                    </p>
                </Section>

                <Section
                    id="contact"
                    theme="dark"
                    snap
                    fullHeight
                >
                    <p
                        className="eyebrow"
                        data-snap-reveal
                    >
                        Contact
                    </p>

                    <h2
                        className="sectionHeading"
                        data-snap-reveal
                    >
                        Let&apos;s build a stronger finance operation.
                    </h2>

                    <p
                        className="lead"
                        data-snap-reveal
                    >
                        Tell us where your finance operation is today
                        and where you want it to go next.
                    </p>
                </Section>
            </SnapPage>
        </main>
    );
}