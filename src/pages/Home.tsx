import { usePageMeta } from '../hooks/usePageMeta';
import Hero from '../sections/Hero';
import ImpactBar from '../sections/ImpactBar';
import Mission from '../sections/Mission';
import ProgramsGrid from '../sections/ProgramsGrid';
import WhereWeWork from '../sections/WhereWeWork';
import DonationTiers from '../sections/DonationTiers';
import StoriesSlider from '../sections/StoriesSlider';
import GetInvolvedSection from '../sections/GetInvolvedSection';
import Partners from '../sections/Partners';
import Gallery from '../sections/Gallery';
import EventsNewsletter from '../sections/EventsNewsletter';

export default function Home() {
  usePageMeta('home');
  return (
    <>
      <Hero />
      <ImpactBar />
      <Mission />
      <ProgramsGrid />
      <WhereWeWork />
      <DonationTiers />
      <StoriesSlider />
      <GetInvolvedSection />
      <Partners />
      <Gallery />
      <EventsNewsletter />
    </>
  );
}
