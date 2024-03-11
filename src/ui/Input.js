import styled from 'styled-components';

const Input = styled.input`
  box-sizing: border-box;
  display: block;
  padding: 0.8em;
  margin-bottom: 1.5em;
  background-color: ${(props) => props.$backgroundColor || 'var(--font-color)'};
  color: var(--primary-color1);
  border-radius: 4px;
  border: 1px solid var(--primary-color2);
  font-size: 1em;
  outline: 0;

  &:focus {
    background-color: var(--color-pink);
    color: var(--primary-color1);
    border: 1px solid var(--primary-color1);
  }

  &:autofill {
    background-color: var(--color-pink);
    color: var(--primary-color1);
    border: 1px solid var(--primary-color1);
  }

  &:placeholder-shown {
  }
`;

export default Input;
