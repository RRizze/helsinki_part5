import styled from 'styled-components';
import { size } from './breakpoints';

const Container = styled.div`
  padding: 0.5em;
  margin: 0 auto;
  max-width: ${size.xl};
  border: none;
  display: block;
  position: relative;
  height: ${(props) => props.$height || '100%'};
  min-height: ${(props) => props.$minHeight || '100%'};
`;

export default Container;
