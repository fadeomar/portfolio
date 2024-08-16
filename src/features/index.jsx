import BoxShadowGenerator from "./BoxShadowGenerator";
import ClipPathGenerator from "./ClipPathGenerator";
import PaintApp from "./PaintApp";
import PhotoEditor from "./PhotoEditor";
import WordsCount from "./WordsCount";
import ScrabbleWordFinder from "./ScrabbleWordFinder";
import AnimationGenerator from "./AnimationGenerator";
import SolarSystem from "./SolarSystem";
import CubeTraffic from "./CubeTraffic";
import Tetris from "./Tetris";

const featuresMap = {
  "box-shadow-generator": (props) => <BoxShadowGenerator {...props} />,
  "clip-path-generator": (props) => <ClipPathGenerator {...props} />,
  "paint-app": (props) => <PaintApp {...props} />,
  "photo-editor": (props) => <PhotoEditor {...props} />,
  "words-count": (props) => <WordsCount {...props} />,
  "scrabble-word-finder": (props) => <ScrabbleWordFinder {...props} />,
  "css-animation-generator": (props) => <AnimationGenerator {...props} />,
  "solar-system": (props) => <SolarSystem {...props} />,
  "cube-traffic": (props) => <CubeTraffic {...props} />,
  tetris: (props) => <Tetris {...props} />,
};

export { BoxShadowGenerator, ClipPathGenerator, featuresMap };
