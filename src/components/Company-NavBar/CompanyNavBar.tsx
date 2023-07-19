import { IoMdNotificationsOutline } from "react-icons/io";
import {
  CompanyNavBarContainer,
  CompanyNavBarTabContainer,
} from "./CompanyNavBar.styles";
import SideBar from "../SideBar/SideBar";
import { useCallback, useState } from "react";

import { RxHamburgerMenu } from "react-icons/rx";
import { companyNavLinks } from "../../layout/CompanyLayout";
import { getUser } from "../../utils/extraFunction";

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
  const [showNav, setShowNav] = useState(false);

  const showNavHandler = () => {
    setShowNav(!showNav);
  };

  const savedUser = getUser();

  return (
    <>
      <SideBar show={showNav} navlinks={companyNavLinks} />
      <CompanyNavBarContainer>
        <div className="left">{children}</div>
        <div className="right">
          <IoMdNotificationsOutline size={20} />
          <p>{savedUser?.full_name || "Anonymous User"}</p>
          <img src={savedUser?.profile_image || ""} alt="profile" />

          <div className="hamburger-icon">
            <RxHamburgerMenu size={30} onClick={showNavHandler} />
          </div>
        </div>
      </CompanyNavBarContainer>
    </>
  );
}

export default CompanyNavBar;
