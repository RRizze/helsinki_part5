import styled from 'styled-components';

const List = styled.ul`
  margin: 0;
  padding: 1em 0em;
  display: ${(props) => props.$display || 'block'};
`;

export default List;
