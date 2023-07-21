import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
  where?: string;
  onClick?: () => void;
  color?: string;
  bolder?: boolean;
  cursor?: string;
  children: React.ReactNode;
};

const TableDataColoredContainer = styled.div<{
  color?: string;
  bolder?: boolean;
  cursor?: string;
}>`
  p {
    cursor: ${(props) => (props.cursor ? `${props.cursor}` : "")};
    color: ${(props) => (props.color ? `${props.color}` : "black")};
    font-weight: ${(props) => (props.bolder ? `700` : "400")};
  }
  a {
    text-decoration: none;
    color: ${(props) => (props.color ? `${props.color}` : "black")};
    font-weight: ${(props) => (props.bolder ? `700` : "400")};
  }
`;

function TableDataColored({
  where,
  onClick,
  cursor,
  color,
  bolder,
  children,
}: Props) {
  return (
    <TableDataColoredContainer color={color} cursor={cursor} bolder={bolder}>
      {where ? (
        <Link to={where}>{children}</Link>
      ) : (
        <p onClick={onClick}>{children}</p>
      )}
    </TableDataColoredContainer>
  );
}

export default TableDataColored;
