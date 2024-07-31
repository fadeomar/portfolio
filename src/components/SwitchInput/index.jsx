import "./style.css";
const SwitchInput = ({ isChecked, setIsChecked }) => {
  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="switch_wrapper">
      <label>
        <input
          className="switch_input"
          type="checkbox"
          checked={isChecked}
          onChange={toggleSwitch}
        />
        <div className="switch_slider" />
      </label>
      <span className="switch_status">{isChecked ? "On" : "Off"}</span>
    </div>
  );
};

export default SwitchInput;
