import { AboutIntroSection } from '@/sections/about/AboutIntroSection/AboutIntroSection';
import { AboutConsultationSection } from '@/sections/about/AboutConsultationSection/AboutConsultationSection';
import { CorePrinciplesSection } from '@/sections/about/CorePrinciplesSection/CorePrinciplesSection';
import { DifferenceCarouselSection } from '@/sections/about/DifferenceCarouselSection/DifferenceCarouselSection';

export default function AboutPage() {
    return (
        <main id="main-content">
            <AboutIntroSection />
            <CorePrinciplesSection />
            <DifferenceCarouselSection />
            <AboutConsultationSection />
        </main>
    );
}
