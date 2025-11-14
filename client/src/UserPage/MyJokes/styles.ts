import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-spacing: 0 2rem;
`;

export const TableHead = styled.thead`
  width: 100%;
  font-size: 2rem;
  text-decoration: underline;

  th {
    padding: 0.5rem;
  }
`;

export const TableData = styled.td`
  text-align: center;
  font-size: 1.5rem;
  border-bottom: 1px solid black;
  padding-bottom: 0.5rem;
`;
