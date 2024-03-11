import Nav from '../ui/Nav';
import StyledLink from '../ui/StyledLink';

const Navbar = () => {
  return (
    <Nav $justifyContent='flex-start'>
      <StyledLink to='/'>home</StyledLink>
      <StyledLink to='/blogs'>blogs</StyledLink>
      <StyledLink to='/users'>users</StyledLink>
    </Nav>
  );
};

export default Navbar;
