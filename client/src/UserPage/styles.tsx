import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  margin: 4rem auto;
  flex-direction: column;
  align-items: center;
`;

export const PostIt = styled.div`
  background-color: ${({ theme }) => theme.postIt.orange};
  padding: 1rem;
  flex-wrap: wrap;
  width: 35%;
  justify-content: center;
  margin: auto;
  margin-bottom: 4rem;
  box-shadow: 5px 5px 10px grey;
`;

export const Title = styled.div`
  font-size: 1.2rem;
`;

export const OfferContent = styled.div`
  font-size: 1.1rem;
  width: 100%;
  justify-content: center;
  margin: 0.5rem 0;
`;

export const FilterWrapper = styled.div`
  width: 100%;
  justify-content: center;
  align-items: end;
`;

export const LittleButton = styled.div`
  text-decoration: underline;
  font-size: 0.9rem;
  margin-left: 0.5rem;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.postIt.pink}
  }
`;

export const FilterTag = styled.div`
  padding: 0.2rem;
  margin: 0.3rem;
  border: 2px solid gray;
  border-radius: 3px;

  &:hover {
    cursor: pointer;
    background-color: gray;
    color: white;
  }
  &.selected {
    background-color: gray;
    color: white;
  }
`;