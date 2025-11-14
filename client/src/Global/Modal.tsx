import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
`;

const StyledModal = styled.div`
  position: fixed;
  top: 25%;
  bottom: 50%;
  left: 25%;
  right: 25%;
  width: 50%;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.postIt.blue};
  height: fit-content;
  padding: 1rem;
  border-radius: 1rem;
`;

const CloseBtn = styled.div`
  color: white;
  background-color: red;
  padding: 0.5rem;
  border-radius: 20%;
  width: 0.75rem;
  height: 0.75rem;
  justify-content: center;
  align-items: center;
  margin-right: 0;
  margin-left: auto;
  &::before {
    content: 'X';
  }

  &:hover {
    cursor: pointer;
    border-radius: 50%;
  }
`;

type ModalProps = {
  close: () => void;
  children: React.ReactNode;
};

export const Modal = ({ close, children }: ModalProps) => {
  return (
    <Wrapper>
      <StyledModal>
        <CloseBtn onClick={close} />
        {children}
      </StyledModal>
    </Wrapper>
  );
};
