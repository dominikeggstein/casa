import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { Demo } from "@/components/landing/demo";
import { Features } from "@/components/landing/features";
import { Modules } from "@/components/landing/modules";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Pricing } from "@/components/landing/pricing";
import { SocialProof } from "@/components/landing/social-proof";
import { FAQ } from "@/components/landing/faq";
import { FinalCTA } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Demo />
        <Features />
        <Modules />
        <HowItWorks />
        <Pricing />
        <SocialProof />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
