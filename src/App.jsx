import useStorage from './hooks/useStorage';
import './App.css';
import TaskListApi from './api/taskListApi';
import TasksPage from './pages/TasksPage';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LogoutPage from './pages/LogoutPage';
import Pages from './pages/pages';
import NavBar from './components/NavBar';
import Header from './components/Header';
import { useCallback, useState } from 'react';

// read the base url from the .env file
const kBaseUrl = import.meta.env.VITE_BASE_URL;
// const kBaseUrl = 'http://localhost:5000';

const api = new TaskListApi(kBaseUrl);

const App = () => {
  const [page, setPage] = useStorage(Pages.welcome, 'page');
  const [user, setUser] = useStorage(null, 'user');
  const [errorMsg, setErrorMsg] = useState('');

  const registerUser = async userData => {
    try {
      await api.registerUserAsync(userData);
      navigate(Pages.login);
    } catch (err) {
      console.log(err.message);
      setErrorMsg(err.message);
    }
  };

  const loginUser = async loginData => {
    try {
      const session = await api.loginUserAsync(loginData);
      setUser(session.user);
      navigate(Pages.tasks);
    } catch (err) {
      console.log(err.message);
      setErrorMsg(err.message);
    }
  };

  const logoutUser = async () => {
    try {
      await api.logoutUserAsync();
      // await api.logoutUserAsync();
    } catch (err) {
      console.log(err.message);
    }

    clearUser();
    navigate(Pages.welcome);
};

  const navigate = (page) => {
    setErrorMsg('');
    setPage(page);
  };

  const clearUser = useCallback(() => {
    setUser(null);
  }, [setUser]);

  const pickPage = (page) => {
    const pages = {
      [Pages.tasks]: {
        builder: () => <TasksPage
          api={api} 
          onUnauthorizedError={clearUser}
          />,
        requiresUser: true,
      },
      [Pages.login]: {
        builder: () => <LoginPage onLoginCallback={loginUser} />,
        requiresUser: false,
      },
      [Pages.logout]: {
        builder: () => <LogoutPage
          onAppear={logoutUser}
          />,
        requiresUser: true,
      },
      [Pages.register]: {
        builder: () => <RegisterPage onRegisterCallback={registerUser} />,
        requiresUser: false,
      },
      [Pages.welcome]: {
        builder: () => <WelcomePage />,
        requiresUser: false,
      },
    };

    const defaultPage = pages[Pages.welcome];

    let selectedPage = pages[page] || defaultPage;
    if (selectedPage.requiresUser && !user) {
      selectedPage = defaultPage;
    }

    return selectedPage.builder();
  };

  const name = user ? user.name : '';
  const pageComponent = pickPage(page);

  return (
    <div className="App">
      <Header name={name} defaultName='Ada' />
      <main>
        { pageComponent }
        {errorMsg && <p className='error'>{errorMsg}</p>}
        <NavBar navigate={navigate} loggedIn={!!user} />
      </main>
    </div>
  );
};

export default App;
