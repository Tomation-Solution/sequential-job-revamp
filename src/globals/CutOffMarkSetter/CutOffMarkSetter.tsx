import { CutOffMarkSetterContainer } from "./CutOffMarkSetter.styles";

type Props = {
  title: string;
  min?: number;
  max?: number;
  value: any;
  itemKey: string;
  onStateChange: React.Dispatch<React.SetStateAction<any>>;
};

function CutOffMarkSetter({
  title,
  min,
  value,
  itemKey,
  max,
  onStateChange,
}: Props) {
  return (
    <CutOffMarkSetterContainer>
      <p>{title}</p>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) =>
          onStateChange((oldState: any) => {
            return { ...oldState, [itemKey]: Number(e.target.value) };
          })
        }
      />
    </CutOffMarkSetterContainer>
  );
}

export default CutOffMarkSetter;
