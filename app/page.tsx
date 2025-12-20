import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Background from '@/components/Background';
import Mission from '@/components/Mission';
import TargetClients from '@/components/TargetClients';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Cases from '@/components/Cases';
import Advantages from '@/components/Advantages';
import LatestArticles from '@/components/LatestArticles';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Background />
      <Mission />
      <TargetClients />
      <Services />
      <Process />
      <Cases />
      <Advantages />
      <LatestArticles />
      <Footer />
    </div>
  );
}
