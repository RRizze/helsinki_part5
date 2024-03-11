import styled from 'styled-components';
import { device, size } from './breakpoints';

const FlexContainer = styled.div`
  max-width: ${size.xl};
  padding: ${(props) => props.$padding || '0.25em'};
  flex-direction: ${(props) => props.$flexDirection || 'row'};
  flex-wrap: ${(props) => props.$flexWrap || 'nowrap'};
  justify-content: ${(props) => props.$justifyContent || 'space-between'};
  align-items: ${(props) => props.$alignItems || 'normal'};
  border: ${(props) => props.$border || 'none'};
  border-radius: 3px;
  display: flex;
  height: ${(props) => props.$height || 'auto'};
  min-height: ${(props) => props.$minHeight || 'auto'};
  margin: ${(props) => props.$margin || '0'};
  gap: 1em;

  @media ${device.sm} {
    flex-direction: column;
  }
`;

export default FlexContainer;
