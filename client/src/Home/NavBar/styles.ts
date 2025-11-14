import styled from 'styled-components';

export const Wrapper = styled.div`
  min-width: 45rem;
  justify-content: space-around;
  margin: 5rem 4rem auto 4rem;
  font-size: 2rem;
`;

export const NavItem = styled.div`
  &.active {
    text-decoration: underline;
    font-weight: bolder;
    color: ${({ theme }) => theme.postIt.pink};
  }

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
