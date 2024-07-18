import PropTypes from 'prop-types';
import './NavBar.css';

const NavBar = ({ navigate, loggedIn }) => {
  const sessionButton = (!loggedIn) ? (
    <li>
      <button onClick={() => navigate('login')}>Login</button>
    </li>
  ) : (
    <li>
      <button onClick={() => navigate('logout')}>Logout</button>
    </li>
  );

  return (
    <div className="NavBar">
      <ul>
        <li>
          <button onClick={() => navigate('tasks')}>View Tasks</button>
        </li>
        { sessionButton }
        <li>
          <button onClick={() => navigate('register')}>Register</button>
        </li>
      </ul>
    </div>
  );
};

NavBar.propTypes = {
  navigate: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default NavBar;