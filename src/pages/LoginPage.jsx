import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';

const LoginPage = ({ onLoginCallback }) => {
  return (
    <div className="LoginPage">
      <h2>Login</h2>
      <LoginForm onLoginCallback={onLoginCallback}/>
    </div>
  );
};

LoginPage.propTypes = {
  onLoginCallback: PropTypes.func.isRequired,
};

export default LoginPage;