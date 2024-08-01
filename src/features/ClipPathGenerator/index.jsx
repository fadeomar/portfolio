import { useState } from "react";
import { SectionWrapper } from "../../hoc";
import "./style.css";

import SelectDimensions from "./SelectDimensions";
import { useParams } from "react-router-dom";
import * as C from "../../components";

const getRandomLightColor = () => {
  const randomColor = Math.floor(Math.random() * 360); // Generate a random hue value
  return `hsl(${randomColor}, 70%, 80%)`; // Use HSL to ensure light backgrounds
};

const getRandomPosition = ({ width, height }) => {
  // Generate random X and Y coordinates within the container's dimensions
  const x = Math.random() * (width - 40);
  const y = Math.random() * (height - 40);
  return { x, y };
};

const ClipPathGenerator = (props) => {
  const { toolId } = useParams();
  const [dimensions, setDimensions] = useState({ width: 500, height: 600 });
  const [showBg, setShowBg] = useState(true);
  const [elements, setElements] = useState([
    {
      id: "element1",
      ...getRandomPosition({
        width: dimensions.width,
        height: dimensions.height,
      }),
      backgroundColor: getRandomLightColor(),
    },
    {
      id: "element2",
      ...getRandomPosition({
        width: dimensions.width,
        height: dimensions.height,
      }),
      backgroundColor: getRandomLightColor(),
    },
    {
      id: "element3",
      ...getRandomPosition({
        width: dimensions.width,
        height: dimensions.height,
      }),
      backgroundColor: getRandomLightColor(),
    },
    // Add more elements as needed
  ]);

  // Function to calculate clip-path value
  const calculateClipPath = (points) => {
    if (points.length < 3) {
      return "";
    }

    const polygonPoints = points
      .map((point) => {
        const xPercent = (point.x / dimensions.width) * 100;
        const yPercent = (point.y / dimensions.height) * 100;
        return `${xPercent.toFixed(2)}% ${yPercent.toFixed(2)}%`;
      })
      .join(", ");

    return polygonPoints;
  };

  const clipPathValue = calculateClipPath(elements);

  const handleMouseDown = (event, elementIndex) => {
    event.preventDefault();

    const element = elements[elementIndex];

    // Calculate the offset from the center of the circle
    const offsetX = event.clientX - element.x;
    const offsetY = event.clientY - element.y;

    const onMouseMove = (event) => {
      const updatedElements = [...elements];
      updatedElements[elementIndex] = {
        ...element,
        x: Math.min(
          Math.max(0, event.clientX - offsetX),
          dimensions.width - 10
        ),
        y: Math.min(
          Math.max(0, event.clientY - offsetY),
          dimensions.height - 10
        ),
      };
      setElements(updatedElements);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleAddCircle = () => {
    // Add a new circle element with random background color and position
    const newElement = {
      id: `element${elements.length + 1}`,
      ...getRandomPosition({
        width: dimensions.width,
        height: dimensions.height,
      }),
      backgroundColor: getRandomLightColor(),
    };

    setElements([...elements, newElement]);
  };

  const handleRemoveCircle = (elementIndex) => {
    // Remove the circle element at the specified index
    const updatedElements = elements.filter(
      (_, index) => index !== elementIndex
    );
    setElements(updatedElements);
  };
  console.log({ props });
  return (
    <div className="CPG_wrapper">
      <SelectDimensions
        setDimensions={setDimensions}
        width={dimensions.width}
        height={dimensions.height}
        setElements={setElements}
        showBg={showBg}
        setShowBg={setShowBg}
      />
      <div
        className="CPG_container"
        style={{
          backgroundImage: `linear-gradient(
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 100, 0.5)
  ),
  url(${showBg ? props.props.testImage : "/"})`,
          width: `min(${dimensions.width}px, 100%)`,
          height: dimensions.height,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "red",
            clipPath: ` polygon(${clipPathValue})`,
            backgroundImage: `url(${props.props.testImage})`,
          }}
        ></div>

        {elements.map((element, index) => (
          <div
            className="draggable_circle"
            key={element.id}
            style={{
              left: element.x - 10 + "px",
              top: element.y - 10 + "px",
              backgroundColor: element.backgroundColor,
            }}
            onMouseDown={(event) => handleMouseDown(event, index)}
          >
            <button
              className="close-button"
              onClick={() => handleRemoveCircle(index)}
            >
              X
            </button>
          </div>
        ))}
      </div>
      <div className="clip_path_text">clip-path: polygon({clipPathValue})</div>
      <C.CopyText>
        {`clip-path: polygon(${clipPathValue});
-webkit-clip-path: polygon(${clipPathValue});
-moz-clip-path: polygon(${clipPathValue});`}
      </C.CopyText>
      <button className="CPG_add_button" onClick={handleAddCircle}>
        Add Circle
      </button>
    </div>
  );
};

export default SectionWrapper(ClipPathGenerator, "ClipPathGenerator");
