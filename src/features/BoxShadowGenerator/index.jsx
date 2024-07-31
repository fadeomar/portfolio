import { useState } from "react";
import { SectionWrapper } from "../../hoc";
import * as C from "../../components";
import "./style.css";
const generateBoxShadow = ({
  h = 0, // horizontalShadowLength
  v = 0, // verticalShadowLength
  r = 0, // blurRadius
  s = 0, // spreadRadius
  o = 0, // colorOpacity
  color = "0,0,0",
  isInsetChecked,
}) => {
  if (isInsetChecked) {
    return `${h}px ${v}px ${r}px ${s}px rgba(${color}, ${o}) inset`;
  }
  return `${h}px ${v}px ${r}px ${s}px rgba(${color}, ${o})`;
};

const BoxShadowGenerator = () => {
  const [isInsetChecked, setIsInsetChecked] = useState(false);
  const [horizontalShadowLength, setHorizontalShadowLength] = useState(10);
  const [verticalShadowLength, setVerticalShadowLength] = useState(10);
  const [blurRadius, setBlurRadius] = useState(5);
  const [spreadRadius, setSpreadRadius] = useState(5);
  const [colorOpacity, setColorOpacity] = useState(0.75);
  const [color, setColor] = useState("0,0,0");
  const [boxColor, setBoxColor] = useState("0,0,255");

  const generatedBoxShadow = generateBoxShadow({
    h: horizontalShadowLength,
    v: verticalShadowLength,
    r: blurRadius,
    s: spreadRadius,
    color: color,
    o: colorOpacity,
    isInsetChecked,
  });
  return (
    <div className="BSG_wrapper">
      <div className="BSG_preview_wrapper">
        <div
          className="BSG_preview"
          style={{
            boxShadow: generatedBoxShadow,
            backgroundColor: `rgb(${boxColor})`,
          }}
        />
        <p>{generatedBoxShadow}</p>

        <C.CopyText>
          {`box-shadow: ${generatedBoxShadow};
-webkit-box-shadow: ${generatedBoxShadow};
-moz-box-shadow: ${generatedBoxShadow};`}
        </C.CopyText>
      </div>
      <ul className="BSG_options_wrapper">
        {/* 1- Horizontal Shadow Length */}
        <li className="BSG_input_wrapper">
          <div className="BSG_option_label">
            <p>Horizontal Shadow Length</p>
            <p>{horizontalShadowLength}px</p>
          </div>
          <C.RangeInput
            name="Horizontal Shadow Length"
            value={horizontalShadowLength}
            min={-200}
            max={200}
            handleChange={(e) => setHorizontalShadowLength(e.target.value)}
          />
        </li>

        {/*2-  Vertical Shadow Length */}
        <li className="BSG_input_wrapper">
          <div className="BSG_option_label">
            <p>Vertical Shadow Length</p>
            <p>{verticalShadowLength}px</p>
          </div>
          <C.RangeInput
            name="Vertical Shadow Length"
            value={verticalShadowLength}
            min={-200}
            max={200}
            handleChange={(e) => setVerticalShadowLength(e.target.value)}
          />
        </li>

        {/*3- Blur Radius */}
        <li className="BSG_input_wrapper">
          <div className="BSG_option_label">
            <p>Blur Radius</p>
            <p>{blurRadius}px</p>
          </div>
          <C.RangeInput
            name="Blur Radius"
            value={blurRadius}
            min={0}
            max={400}
            handleChange={(e) => setBlurRadius(e.target.value)}
          />
        </li>

        {/*4- Spread Radius */}
        <li className="BSG_input_wrapper">
          <div className="BSG_option_label">
            <p>Spread Radius</p>
            <p>{spreadRadius}px</p>
          </div>
          <C.RangeInput
            name="Spread Radius"
            value={spreadRadius}
            min={-200}
            max={200}
            step="1"
            handleChange={(e) => setSpreadRadius(e.target.value)}
          />
        </li>

        {/*5- Shadow Color Opacity */}
        <li className="BSG_input_wrapper">
          <div className="BSG_option_label">
            <p>Shadow Color Opacity</p>
            <p>{colorOpacity}</p>
          </div>
          <C.RangeInput
            name="Shadow Color Opacity"
            value={colorOpacity}
            min={0}
            max={1}
            step={"0.01"}
            handleChange={(e) => setColorOpacity(e.target.value)}
          />
        </li>

        {/*6- Color */}
        <li className="BSG_input_wrapper">
          <div className="BSG_option_label">
            <p>Shadow Color</p>
            <div
              className="BSG_colored_div"
              style={{ background: `rgb(${color})` }}
            >
              <C.ColorInput
                name="Shadow Color"
                value={`rgb(${color})`}
                handleChange={function printColor(ev) {
                  const color = ev.target.value;
                  const r = parseInt(color.substr(1, 2), 16);
                  const g = parseInt(color.substr(3, 2), 16);
                  const b = parseInt(color.substr(5, 2), 16);
                  console.log(`red: ${r}, green: ${g}, blue: ${b}`);
                  setColor(`${r},${g},${b}`);
                }}
              />
            </div>
          </div>
        </li>

        {/*7- Inset */}
        <li className="BSG_input_wrapper">
          <div className="BSG_option_label">
            <p>Inset</p>
            <C.SwitchInput
              isChecked={isInsetChecked}
              setIsChecked={setIsInsetChecked}
            />
          </div>
        </li>

        {/*8- Color */}
        <li className="BSG_input_wrapper">
          <div className="BSG_option_label">
            <p>Shadow Color</p>
            <div
              className="BSG_colored_div"
              style={{ background: `rgb(${boxColor})` }}
            >
              <C.ColorInput
                name="Box Color"
                value={`rgb(${boxColor})`}
                handleChange={function printColor(ev) {
                  const color = ev.target.value;
                  const r = parseInt(color.substr(1, 2), 16);
                  const g = parseInt(color.substr(3, 2), 16);
                  const b = parseInt(color.substr(5, 2), 16);
                  setBoxColor(`${r},${g},${b}`);
                }}
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SectionWrapper(BoxShadowGenerator, "BoxShadowGenerator");
