import { useQuery } from '@tanstack/react-query';
import blogService from '../services/blogs';

export const useBlogData = (blogId) => {
  return useQuery({
    queryKey: ['blogs', blogId],
    queryFn: async () => await blogService.getBlogById(blogId),
  });
};

export const useBlogsData = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  });
};
