import { IoMdNotificationsOutline } from "react-icons/io";

import { getUser } from "../../utils/extraFunction";
import { CompanyNavBarContainer } from "../Company-NavBar/CompanyNavBar.styles";

type Props = {
  children: React.ReactNode;
};

function PanelistNavBar({ children }: Props) {
  const savedUser = getUser();

  return (
    <>
      <CompanyNavBarContainer>
        <div className="left">{children}</div>
        <div className="right">
          <IoMdNotificationsOutline size={20} />
          <p>{savedUser?.full_name || "Anonymous User"}</p>
          <img src={savedUser?.profile_image || ""} alt="profile" />
        </div>
      </CompanyNavBarContainer>
    </>
  );
}

export default PanelistNavBar;
