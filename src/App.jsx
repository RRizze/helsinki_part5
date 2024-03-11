import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import User from './components/User';
import { getUser, addUserFromLocalStore } from './reducers/authReducer';

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

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addUserFromLocalStore());
  }, []);

  const user = useSelector(getUser);

  return (
    <FlexContainer $flexDirection='column' $height={'100vh'} $margin={'0 auto'}>
      <Notification />

      <Router>
        <Header>
          {!user ? <Navigate to='/login' /> : <Navbar />}
          <UserPanel user={user} />
        </Header>

        <MainContent>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginForm user={user} />} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/:id' element={<User />} />
            <Route path='/blogs/:id' element={<Blog user={user}/>} />
          </Routes>
        </MainContent>
      </Router>
      <Footer>This is a simple footer. 2024</Footer>
    </FlexContainer>
  );
};

export default App;
