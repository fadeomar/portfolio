import { ToolsSection } from "../../sections/ToolPage";
import { Contact } from "../../sections/General";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import { featuresMap } from "../../features";

const NotFound = () => <div>Not Found</div>;

const ToolPage = () => {
  const { toolId } = useParams();
  console.log({ toolId });
  const ToolComponent = featuresMap[toolId] || NotFound;
  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
      </div>
      <ToolComponent />
      {/* <Contact /> */}
    </div>
  );
};

export default ToolPage;
