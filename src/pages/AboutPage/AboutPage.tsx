import { Section } from '@/components/layout/Section/Section';

export default function AboutPage() {
    return (
        <main id="main-content">
            <Section theme="blue">
                <p className="eyebrow">About Us</p>

                <h1 className="displayHeading">
                    Finance expertise strengthened by technology.
                </h1>
            </Section>

            <Section theme="light">
                <h2 className="sectionHeading">
                    The About Us sections will be developed here.
                </h2>
            </Section>
        </main>
    );
}