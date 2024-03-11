import styled from 'styled-components';

const Button = styled.button`
  padding: 0.7em;
  border-radius: 4px;
  border: 1px solid var(--primary-color2);
  font-size: 1.2em;
  font-weight: bold;
  outline: 0;
  transition: all 0.2s;
  height: 100%;
  box-shadow: 6px 6px var(--primary-color2);
  display: inline-block;

  &:hover {
    opacity: 0.9;
    cursor: pointer;
    box-shadow: 2px 2px var(--primary-color2);
  }
  &:active {
    opacity: 0.7;
  }
`;

export default Button;
