import styled from "styled-components";
import {
  seqBlue100,
  seqGray100,
  seqGreen,
  seqRed,
  seqYellow,
} from "../../globals/colors";
import { tablet } from "../../responsive";

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;

  margin: 30px 0px;

  ${tablet({
    width: "800px",
  })}
`;
export const TableContainer = styled.div`
  overflow-x: auto;
`;
export const TableHeader = styled.thead`
  background-color: ${seqGray100};
`;
export const TableBody = styled.tbody``;
export const TableHead = styled.th`
  padding: 10px;
  color: ${seqBlue100};
  font-weight: 500;
`;
export const TableData = styled.td`
  padding: 10px;
  text-align: center;
`;
export const TableRow = styled.tr``;

export const TableAccept = styled.span`
  cursor: pointer;
  color: ${seqGreen};
`;
export const TableReject = styled.span`
  color: ${seqRed};
  cursor: pointer;
`;
export const TableView = styled.span`
  color: ${seqYellow};
  cursor: pointer;
`;
