import { useState } from "react";
import * as C from "../../components";

const Divider = (props) => (
  <div
    {...props}
    style={{
      margin: "20px auto",
      width: "100%",
      border: "1px solid pink",
      minHeight: "10px",
      background: "pink",
    }}
  />
);

const RangeInputStory = () => {
  const [value, setValue] = useState(1);
  return (
    <C.RangeInput
      handleChange={(e) => {
        setValue(e.target.value);
      }}
      max={100}
      min={1}
      name={"test_range_input"}
      step={1}
      value={value}
      key={"test_range_input"}
    />
  );
};

const ColorInputStory = () => {
  const [color, setColor] = useState("");
  return (
    <div style={{ width: 400, height: 100 }}>
      <C.ColorInput
        name="Shadow Color"
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
  );
};

const SwitchInputStory = () => {
  const [isInsetChecked, setIsInsetChecked] = useState(false);

  return (
    <div style={{ width: 400, height: 100 }}>
      <C.SwitchInput
        isChecked={isInsetChecked}
        setIsChecked={setIsInsetChecked}
      />
    </div>
  );
};

const CopyTextStory = () => {
  return <C.CopyText>this is test text to copy on Click</C.CopyText>;
};
const Storybook = () => {
  return (
    <div
      style={{
        margin: "20px auto",
        width: "100%",
        maxWidth: "1200px",
        border: "1px solid pink",
        minHeight: "100vh",
      }}
    >
      <Divider />
      <h1>Hello from storybook page</h1>
      <Divider />
      <RangeInputStory />
      <Divider />
      <ColorInputStory />
      <Divider />
      <SwitchInputStory />
      <Divider />
      <CopyTextStory />
      <Divider />
    </div>
  );
};

export default Storybook;
