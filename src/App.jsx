import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import User from './components/User';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Users from './components/Users';
import FlexContainer from './ui/FlexContainer';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MainContent from './ui/MainContent';
import Footer from './ui/Footer';
import Header from './ui/Header';
import UserPanel from './components/UserPanel';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getUser } from './services/localStorage';

const fetchFromLocalStore = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = getUser();
      if (user) {
        resolve(user);
      } else {
        reject(new Error('No user in localStorage'));
      }
    }, 0);
  });
};

const App = () => {
  // TODO: mixing localstorage and query?
  // this is not asynchronous source of data
  // meh need MORE libs
  const user = useQuery({
    queryKey: ['authUser'],
    queryFn: fetchFromLocalStore,
  });

  return (
    <FlexContainer $flexDirection='column' $height={'100vh'} $margin={'0 auto'}>
      <Notification />

      <Router>
        <Header>
          {!user.data ? <Navigate to='/login' /> : <Navbar />}
          <UserPanel />
        </Header>

        <MainContent>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/:id' element={<User />} />
            <Route path='/blogs/:id' element={<Blog />} />
          </Routes>
        </MainContent>
      </Router>
      <Footer>This is a simple footer. 2024</Footer>
    </FlexContainer>
  );
};

export default App;
