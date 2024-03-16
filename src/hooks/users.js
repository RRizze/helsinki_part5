import { useQuery } from '@tanstack/react-query';
import userService from '../services/users';

export const useUserData = (id) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => await userService.getUserById(id),
  });
};

export const useUsersData = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => await userService.getUsers(),
  });
};
