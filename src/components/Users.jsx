import { useState, useEffect } from 'react';
import usersService from '../services/users';
import StyledLink from '../ui/StyledLink';
import FlexContainer from '../ui/FlexContainer';
import List from '../ui/List';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await usersService.getUsers();
      setUsers(data);
    }
    fetchData();
  }, []);

  return (
    <div className='users-info'>
      <h2>Users info</h2>
      <List $display='inline-block'>
        {users.length > 0 &&
          users.map((user) => (
            <li key={user.id}>
              <FlexContainer
                $justifyContent='flex-start'
                $alignItems='baseline'
                $flexDirection='column'
                $border='1px solid var(--primary-color1)'
                $padding='1.5em 1em'
              >
                <StyledLink color='var(--color-blue)' to={`/users/${user.id}`}>
                  {user.username}
                </StyledLink>
                <span>created blogs: {user.blogs.length}</span>
              </FlexContainer>
            </li>
          ))}
      </List>
    </div>
  );
};

export default Users;
