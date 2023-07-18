import { IoMdNotificationsOutline } from "react-icons/io";
import {
  CompanyNavBarContainer,
  CompanyNavBarTabContainer,
} from "./CompanyNavBar.styles";
import SideBar from "../SideBar/SideBar";
import { useState } from "react";

import { RxHamburgerMenu } from "react-icons/rx";
import { companyNavLinks } from "../../layout/CompanyLayout";

type CompanyNavBarTabProps = {
  isSelected?: boolean;
  children: React.ReactNode;
};

export function CompanyNavBarTab({
  isSelected,
  children,
}: CompanyNavBarTabProps) {
  return (
    <CompanyNavBarTabContainer isSelected={isSelected}>
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

  return (
    <>
      <SideBar show={showNav} navlinks={companyNavLinks} />
      <CompanyNavBarContainer>
        <div className="left">{children}</div>
        <div className="right">
          <IoMdNotificationsOutline size={20} />
          <p>Name</p>
          <img src="" alt="" />

          <div className="hamburger-icon">
            <RxHamburgerMenu size={30} onClick={showNavHandler} />
          </div>
        </div>
      </CompanyNavBarContainer>
    </>
  );
}

export default CompanyNavBar;
