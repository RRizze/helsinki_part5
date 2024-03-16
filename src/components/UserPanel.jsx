import Button from '../ui/Button';
import FlexContainer from '../ui/FlexContainer';
import { useQueryClient } from '@tanstack/react-query';
import { removeUser } from '../services/localStorage';

const UserPanel = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['authUser']);

  const logOut = () => {
    removeUser();
    queryClient.setQueryData(['authUser'], null);
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
