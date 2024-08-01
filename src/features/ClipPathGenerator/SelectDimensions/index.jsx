import "./style.css";
const SelectDimensions = ({
  width,
  height,
  setDimensions,
  setElements,
  setShowBg,
  showBg,
}) => {
  const handleWidthChange = (e) => {
    const newWidth = parseInt(e.target.value, 10);
    setDimensions({ width: newWidth, height });

    setElements((old) =>
      old.map((element) => ({
        ...element,
        x: (element.x / width) * newWidth,
      }))
    );
  };

  const handleHeightChange = (e) => {
    const newHeight = parseInt(e.target.value, 10);
    setDimensions({ width, height: newHeight });

    setElements((old) =>
      old.map((element) => ({
        ...element,
        y: (element.y / height) * newHeight,
      }))
    );
  };

  return (
    <>
      <div className="SD_switch_wrapper">
        <b>Show outside clip-path</b>
        <label className="SD_switch_label">
          <input
            className="SD_switch_input"
            htmlFor="switchBg"
            type="checkbox"
            id="switchBg"
            onChange={(e) => {
              setShowBg(e.target.checked);
            }}
            checked={showBg}
          />
          <span className="SD_switch_span slider round"></span>
        </label>
      </div>
      <div className="SD_wrapper">
        <label htmlFor="positiveNumber">Demo Size</label>
        <input
          className="SD_input"
          type="number"
          id="positiveNumber"
          name="positiveNumber"
          min="100"
          max="500"
          value={width}
          onChange={handleWidthChange}
          required
        />
        X
        <input
          type="number"
          className="SD_input"
          id="positiveNumber2"
          name="positiveNumber2"
          min="100"
          max="600"
          value={height}
          onChange={handleHeightChange}
          required
        />
      </div>
    </>
  );
};

export default SelectDimensions;
