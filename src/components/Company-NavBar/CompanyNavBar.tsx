import { IoMdNotificationsOutline } from "react-icons/io";
import {
  CompanyNavBarContainer,
  CompanyNavBarTabContainer,
} from "./CompanyNavBar.styles";

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
  return (
    <CompanyNavBarContainer>
      <div className="left">{children}</div>
      <div className="right">
        <IoMdNotificationsOutline size={20} />
        <p>Name</p>
        <img src="" alt="" />
      </div>
    </CompanyNavBarContainer>
  );
}

export default CompanyNavBar;
