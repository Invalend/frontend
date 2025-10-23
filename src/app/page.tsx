import Navbar from '@/components/homepage/Navbar';
import HeroSection from '@/components/homepage/HeroSection';
import ProblemSection from '@/components/homepage/ProblemSection';
import SolutionSection from '@/components/homepage/SolutionSection';
import ArchitectureOverview from '@/components/homepage/ArchitectureOverview';
import FeaturesSection from '@/components/homepage/FeaturesSection';
import UseCasesSection from '@/components/homepage/UseCasesSection';
import StatsSection from '@/components/homepage/StatsSection';
import CTASection from '@/components/homepage/CTASection';
import Footer from '@/components/homepage/Footer';
import ErrorBoundary from '@/components/common/ErrorBoundary';


export default function HomePage() {
  return (
    <main id="main-content">
      <ErrorBoundary>
        <Navbar />
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ArchitectureOverview />
        <FeaturesSection />
        <UseCasesSection />
        <StatsSection />
        <CTASection />
        <Footer />
      </ErrorBoundary>
    </main>
  );
}
