import { useNavigate } from "react-router-dom";
import Greetings from "../Greetings/Greetings";

type Props = {
  title: string;
  body?: string;
  btnText: string;
  where: string;
};

function CompletionComponent({ title, body, btnText, where }: Props) {
  const navigate = useNavigate();

  const navigationFunction = () => {
    navigate(where || "/");
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "80vh",
      }}
    >
      <Greetings
        title={title}
        body={body || ""}
        onClick={navigationFunction}
        buttonName={btnText}
      />
    </div>
  );
}

export default CompletionComponent;
