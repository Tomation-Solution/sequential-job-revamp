import { IoMdNotificationsOutline } from "react-icons/io";
import {
  CompanyNavBarContainer,
  CompanyNavBarTabContainer,
} from "./CompanyNavBar.styles";
import { useCallback } from "react";

import { getUser } from "../../utils/extraFunction";
import NofiicationComponent from "../NofiicationComponent";

type CompanyNavBarTabProps = {
  isSelected?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

export function CompanyNavBarTab({
  isSelected,
  children,
  onClick,
}: CompanyNavBarTabProps) {
  const onClickHandler = useCallback(() => {
    if (!onClick) {
      return;
    }

    onClick();
  }, [onClick]);

  return (
    <CompanyNavBarTabContainer onClick={onClickHandler} isSelected={isSelected}>
      <div>{children}</div>
    </CompanyNavBarTabContainer>
  );
}

type Props = {
  children: React.ReactNode;
};

function CompanyNavBar({ children }: Props) {
  const savedUser = getUser();

  return (
    <>
      <CompanyNavBarContainer>
        <div className="left">{children}</div>
        <div className="right">
          <NofiicationComponent />
          {/* <IoMdNotificationsOutline size={20} /> */}
          <p>{savedUser?.full_name || "Anonymous User"}</p>
          <img src={savedUser?.profile_image || ""} alt="profile" />
        </div>
      </CompanyNavBarContainer>
    </>
  );
}

export default CompanyNavBar;
