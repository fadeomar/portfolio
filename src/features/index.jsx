import BoxShadowGenerator from "./BoxShadowGenerator";
import ClipPathGenerator from "./ClipPathGenerator";
import PaintApp from "./PaintApp";
import PhotoEditor from "./PhotoEditor";

const featuresMap = {
  "box-shadow-generator": (props) => <BoxShadowGenerator {...props} />,
  "clip-path-generator": (props) => <ClipPathGenerator {...props} />,
  "paint-app": (props) => <PaintApp {...props} />,
  "photo-editor": (props) => <PhotoEditor {...props} />,
};

export { BoxShadowGenerator, ClipPathGenerator, featuresMap };
