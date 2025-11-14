import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 2px solid black;
  position: absolute;
  right: 16px;
  top: 8px;
  width: 6rem;
  font-weight: bold;
`;

export const Option = styled.div`
  cursor: pointer;
  padding: 0.5rem;

  &.dark {
    border-right: 2px solid black;
    color: white;
    background-color: ${({ theme }) => theme.bodyBackground.dark};
  }
  &.light {
    border-left: 2px solid black;
    background-color: ${({ theme }) => theme.bodyBackground.light};
  }
  &.selected {
    &:first-child {
      color: black;
      background-color: black;
    }
    &:last-child {
      color: white;
      background-color: white;
    }
  }
`;