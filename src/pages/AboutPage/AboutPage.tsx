import { AboutIntroSection } from '@/sections/about/AboutIntroSection/AboutIntroSection';
import { CorePrinciplesSection } from '@/sections/about/CorePrinciplesSection/CorePrinciplesSection';

export default function AboutPage() {
    return (
        <main id="main-content">
            <AboutIntroSection />
            <CorePrinciplesSection />
        </main>
    );
}
