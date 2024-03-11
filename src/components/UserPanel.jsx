import Button from '../ui/Button';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/authReducer';
import FlexContainer from '../ui/FlexContainer';

const UserPanel = ({ user }) => {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };

  if (!user) {
    return null;
  }
  return (
    <FlexContainer $alignItems='baseline'>
      <span>{user.name} is logged in</span>
      <Button id='logout' onClick={logOut}>
        logout
      </Button>
    </FlexContainer>
  );
};

export default UserPanel;
