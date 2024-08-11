import BoxShadowGenerator from "./BoxShadowGenerator";
import ClipPathGenerator from "./ClipPathGenerator";
import PaintApp from "./PaintApp";
import PhotoEditor from "./PhotoEditor";
import WordsCount from "./WordsCount";
import ScrabbleWordFinder from "./ScrabbleWordFinder";
import AnimationGenerator from "./AnimationGenerator";

const featuresMap = {
  "box-shadow-generator": (props) => <BoxShadowGenerator {...props} />,
  "clip-path-generator": (props) => <ClipPathGenerator {...props} />,
  "paint-app": (props) => <PaintApp {...props} />,
  "photo-editor": (props) => <PhotoEditor {...props} />,
  "words-count": (props) => <WordsCount {...props} />,
  "scrabble-word-finder": (props) => <ScrabbleWordFinder {...props} />,
  "css-animation-generator": (props) => <AnimationGenerator {...props} />,
};

export { BoxShadowGenerator, ClipPathGenerator, featuresMap };
