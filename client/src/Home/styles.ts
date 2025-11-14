import styled from 'styled-components';

export const Backdrop = styled.div`
  flex-wrap: wrap;
  flex-direction: column;
`;

export const Title = styled.div`
  font-size: 18rem;
  margin: auto;
  margin-top: 3rem;
  text-shadow: 6px 6px ${({ theme }) => theme.postIt.yellow};
  text-align: center;
`;

export const Wrapper = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  padding: 0 8rem;
  justify-content: space-around;

  @media (max-width: 780px) {
    padding: 0;
  }
`;

export const OfferBox = styled.div`
  background-color: ${({ theme }) => theme.postIt.yellow};
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1rem;
  box-shadow: 5px 5px 10px grey;
  width: 45%;
  min-width: 25rem;
  height: fit-content;
  margin-bottom: 4rem;

  > * {
    margin: auto;
  }
`;

export const OfferTitle = styled.div`
  font-size: 3rem;
  justify-content: center;
  width: 100%;
`;

export const OfferContent = styled.div`
  font-size: 1.1rem;
  width: 100%;
  justify-content: center;
  text-align: center;
  margin: 0.5rem 0;
`;

export const OfferButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 3px;
  border: 3px solid #f0f0f0;
  margin-top: 1rem;

  &:hover {
    cursor: pointer;
    border: 3px solid black;
    font-weight: bold;
  }
`;

export const FilterWrapper = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const FilterTag = styled.div`
  padding: 0.2rem;
  margin: 0.3rem;
  border: 2px solid gray;
  border-radius: 3px;
  text-transform: capitalize;

  &:hover {
    cursor: pointer;
    background-color: gray;
    color: white;
  }
  &.selected {
    background-color: gray;
    color: white;
  }
  &.fit-content {
    width: fit-content;
  }
`;

export const LittleButton = styled.div`
  text-decoration: underline;
  font-size: 0.9rem;
  margin-left: 0.5rem;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.postIt.pink};
  }
`;

export const Joke = styled.div`
  font-size: 1.75rem;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
  text-align: center;
`;

export const HoverText = styled.span`
  display: none;

  &:hover {
    display: block;
    position: absolute;
  }
`;

export const InputSearch = styled.input`
  font-size: 1.1rem;
  text-align: center;
  margin: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  height: 2rem;
  width: 100%;

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

export const ButtonWrapper = styled.div`
  width: 100%;
  justify-content: space-around;
  margin-top: 1rem;
`;

export const InputWrapper = styled.div`
  flex-wrap: wrap;
  justify-content: center;
`;

export const Description = styled.div`
  font-style: italic;
  font-size: 1rem;
  width: 100%;
  justify-content: center;
`;

export const SmallText = styled.span`
  font-size: 0.75rem;
  align-self: center;
`;

export const TagsWrapper = styled.div`
  flex-direction: column;
  width: 80%;
`;

export const Dropdown = styled.div`
  width: 15rem;
  justify-content: center;
  flex-wrap: wrap;
  margin: auto;
`;

export const DropdownItem = styled.div`
  width: 100%;
  justify-content: center;
  background-color: white;
  padding: 0.25rem;
  border-bottom: 1px solid gray;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.bodyBackground.dark};
    color: white;
  }
`;

export const Emoji = styled.img`
  &:hover {
    cursor: pointer;
    opacity: 1;
  }

  opacity: 0.5;

  &.selected {
    opacity: 1;
  }
`;

export const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  zoom: 1.7;
  @media (max-width: 820px) {
    zoom: 1;
  }
`;

export const CheckBoxWrapper = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;

  & > label {
    font-size: 1.2rem;
  }
`;

export const ReportButton = styled.div`
  color: ${({ theme }) => theme.postIt.red};
  margin-top: 3rem;
  width: 20%;
  justify-content: center;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const Bold = styled.div`
  font-weight: bold;
  width: 3.5rem;
`;
