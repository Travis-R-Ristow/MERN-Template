import styled from 'styled-components';

export const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 3px;
  border: 3px solid #f0f0f0;
  height: fit-content;
  align-self: center;

  &:hover {
    cursor: pointer;
    border: 3px solid black;
    font-weight: bold;
  }
`;
