import {
  About,
  Experience,
  // Feedbacks,
  Hero,
  // Navbar,
  Tech,
  Works,
  StarsCanvas,
  Tools,
} from "../../sections/LandingPage";
import { Contact } from "../../sections/General";
import Navbar from "../../components/Navbar";
const LandingPage = () => {
  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      <About />
      <Experience />
      <Tech />
      <Works />
      <Tools />
      {/* <Feedbacks /> */}
      <div className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div>
    </div>
  );
};

export default LandingPage;
