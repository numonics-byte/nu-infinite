import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FloridaParallax from "@/components/FloridaParallax";
import About from "@/components/About";
import Player from "@/components/Player";
import Bookings from "@/components/Bookings";
import Footer from "@/components/Footer";
import NowPlaying from "@/components/NowPlaying";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <FloridaParallax />
      <Player />
      <Bookings />
      <Footer />
      <NowPlaying />
    </main>
  );
}
