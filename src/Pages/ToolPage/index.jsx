import { ToolsSection } from "../../sections/ToolPage";
import { Contact } from "../../sections/General";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import { featuresMap } from "../../features";
import { tools } from "../../constants";
const NotFound = () => <div>Not Found</div>;

const ToolPage = () => {
  const { toolId } = useParams();
  const ToolComponent = featuresMap[toolId] || NotFound;
  const toolCardProps = tools.find((item) => item.slug === toolId) || {};
  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
      </div>
      <ToolComponent {...toolCardProps} />
      {/* <Contact /> */}
    </div>
  );
};

export default ToolPage;
