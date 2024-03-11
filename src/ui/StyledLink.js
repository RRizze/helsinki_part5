import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  padding: 0.25em;
  border: none;
  border-bottom: 3px solid ${(props) => props.color || 'var(--color-red)'};
  color: ${(props) => props.color || 'var(--color-red)'};
  font-weight: bold;
  font-size: 18px;
  line-height: 1.5;
  letter-spacing: 0.1em;
  text-decoration: none;
  max-height: 40px;
  display: inline-block;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
    border-color: var(--primary-color1);
  }
`;

export default StyledLink;
