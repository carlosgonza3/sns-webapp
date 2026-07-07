
import { SnapPage } from '@/components/layout/SnapPage/SnapPage';
import { FinanceExpertiseSection } from '@/sections/home/FinanceExpertiseSection/FinanceExpertiseSection';
import { HomeHeroSection } from '@/sections/home/HomeHeroSection/HomeHeroSection';
import { ServicesOverviewSection } from '@/sections/home/ServicesOverviewSection/ServicesOverviewSection';
import {ContactFinalSection} from "@/sections/home/ContactFinalSection/  ContactFinalSection";

export default function HomePage() {
    return (
        <main id="main-content">
            <SnapPage>
                <HomeHeroSection />

                <FinanceExpertiseSection />

                <ServicesOverviewSection />

               <ContactFinalSection />
            </SnapPage>
        </main>
    );
}