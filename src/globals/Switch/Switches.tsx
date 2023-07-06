import Switch from "react-switch";

interface SwitchedProps {
  onChangefn: (value: boolean) => void;
  checked: boolean;
}

const Switches: React.FC<SwitchedProps> = ({ onChangefn, checked }) => {
  const handleChange = (nextChecked: boolean) => {
    onChangefn(nextChecked);
  };

  return (
    <>
      <Switch
        onChange={handleChange}
        checked={checked}
        onColor="#304ef5"
        onHandleColor="#fff"
        handleDiameter={15}
        draggable={false}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={20}
        width={48}
        className="react-switch"
        id="material-switch"
      />
    </>
  );
};

export default Switches;
