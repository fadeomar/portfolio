import "./style.css";

const RangeInput = ({
  handleChange,
  name,
  value,
  max,
  min,
  step = 1,
  ...props
}) => {
  return (
    <input
      className="range_input"
      type="range"
      onChange={handleChange}
      name={name}
      value={value}
      max={max}
      min={min}
      step={step}
      {...props}
    />
  );
};

export default RangeInput;
