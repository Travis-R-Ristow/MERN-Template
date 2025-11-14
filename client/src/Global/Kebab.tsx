import classnames from 'classnames';
import styled from 'styled-components';

const StylesKebab = styled.div`
  justify-content: center;
  flex-direction: column;

  & > div {
    position: absolute;
  }

  & > div > div {
    position: relative;
    left: 3.5rem;
    background: lightgray;
    border-radius: 1rem;
    padding: 0.5rem;
  }

  & > div > div > p {
    margin: 0;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    user-select: none;
  }

  .isHidden {
    display: none;
  }

  &::before {
    content: '...';
  }

  &:hover {
    cursor: pointer;
  }
`;

export const Kebab = ({ isActive, children }: { isActive: boolean; children: React.ReactNode }) => (
  <StylesKebab>
    <div className={classnames({ isHidden: !isActive })}>
      <div>{children}</div>
    </div>
  </StylesKebab>
);
