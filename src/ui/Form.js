import styled from 'styled-components';
import { size } from './breakpoints';

const Form = styled.form`
  padding: 1.5em 1em;
  margin: ${(props) => props.$margin || '1em 0em 1.3em'};
  background: ${(props) => props.$backgroundColor || 'var(--primary-color3)'};
  border: ${(props) => props.$border || 'none'};
  border-radius: 4px;
  max-width: ${size.xs};
`;

export default Form;
