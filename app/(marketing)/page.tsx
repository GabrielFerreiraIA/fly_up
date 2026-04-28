import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import Experiences from "@/components/sections/Experiences";
import Authority from "@/components/sections/Authority";
import Testimonials from "@/components/sections/Testimonials";
import YoutubeAuthority from "@/components/sections/YoutubeAuthority";
import YoutubeChannel from "@/components/sections/YoutubeChannel";
import SocialConnect from "@/components/sections/SocialConnect";
import FAQ from "@/components/sections/FAQ";
import SafetyObjections from "@/components/sections/SafetyObjections";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <SocialProof />
      <Experiences />
      <SafetyObjections />
      <Authority />
      <Testimonials />
      <YoutubeAuthority />
      <YoutubeChannel />
      <SocialConnect />
      <FAQ />
    </div>
  );
}
