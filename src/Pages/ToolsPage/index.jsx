import { ToolsSection } from "../../sections/ToolPage";
import { Contact } from "../../sections/General";
import Navbar from "../../components/Navbar";
const ToolsPage = () => {
  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center mb-11">
        <Navbar />
      </div>
      <ToolsSection />
      <Contact />
    </div>
  );
};

export default ToolsPage;
