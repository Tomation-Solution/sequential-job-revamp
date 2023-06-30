import React, { useCallback } from "react";
import {
  CompanyMedicalsActualBtn,
  CompanyMedicalsBtnContainer,
} from "../CompanyMedicals.styles";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  centered?: boolean;
};

export function CompanyMedicalsBtn({ children, onClick, centered }: Props) {
  const onClickHandler = useCallback(() => {
    if (!onClick) {
      return;
    }

    onClick();
  }, [onClick]);

  return (
    <CompanyMedicalsActualBtn centered={centered} onClick={onClickHandler}>
      {children}
    </CompanyMedicalsActualBtn>
  );
}

interface CompanyMdeicalsBtnWitHeaderProps {
  children: React.ReactNode;
  header: string;
}

export function CompanyMdeicalsBtnWitHeader({
  children,
  header,
}: CompanyMdeicalsBtnWitHeaderProps) {
  return (
    <CompanyMedicalsBtnContainer>
      <p>{header}</p>
      <div className="halved">{children}</div>
    </CompanyMedicalsBtnContainer>
  );
}
