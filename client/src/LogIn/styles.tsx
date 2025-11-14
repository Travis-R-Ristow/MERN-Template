import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  margin: 4rem auto 0;
  justify-content: center;
  flex-direction: column;
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

export const BasicWrapper = styled.div`
  width: 100%;
  justify-content: center;
  flex-direction: column;

  > * {
    margin: auto;
  }
`;

export const Input = styled.input`
  height: 1.5rem;
  font-size: 1.1rem;
  text-align: center;
  margin: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  height: 2rem;
  
  &.green {
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      transition: background-color 0s ease-in-out 0s !important;
      -webkit-box-shadow: 0 0 0 40px ${({ theme }) => theme.postIt.green} inset !important;
    }
    background-color: ${({ theme }) => theme.postIt.green} !important;
    border: 2px solid green;
  }

  &.red {
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      transition: background-color 0s ease-in-out 0s !important;
      -webkit-box-shadow: 0 0 0 40px ${({ theme }) => theme.postIt.pink} inset !important;
    }
    background-color: ${({ theme }) => theme.postIt.pink} !important;
    border: 2px solid red;
  }
`;

export const TitleWrapper = styled.div`
  width: 100%;
  justify-content: center;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
`;

export const Description = styled.div`
  width: 100%;
  justify-content: center;
  font-size: 1.2rem;
`;

export const LoginButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border-radius: 3px;
  border: 3px solid #F0F0F0;
  margin-top: 1rem;
  width: 50%;
  margin: 1rem auto;

  &:hover {
    cursor: pointer;
    border: 3px solid black;
    font-weight: bold;
  }
`;