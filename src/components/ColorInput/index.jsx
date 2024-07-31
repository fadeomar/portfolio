import "./style.css";
const ColorInput = ({ handleChange, name, ...props }) => {
  return (
    <input
      className="color_input"
      type="color"
      onChange={handleChange}
      name={name}
      {...props}
    />
  );
};

export default ColorInput;
