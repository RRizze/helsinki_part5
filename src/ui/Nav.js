import styled from 'styled-components';
import { device } from './breakpoints';
import FlexContainer from './FlexContainer';

const Nav = styled(FlexContainer)`
  padding: 0.2em;
  border-radius: 4px;
  gap: 1.5em;
  justify-content: flex-start;

  @media ${device.sm} {
    flex-direction: column;
  }
`;

export default Nav;
