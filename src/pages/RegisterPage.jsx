import PropTypes from 'prop-types';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = ({ onRegisterCallback }) => {
  return (
    <div className="RegisterPage">
      <h2>Register</h2>
      <RegisterForm onRegisterCallback={onRegisterCallback} />
    </div>
  );
};

RegisterPage.propTypes = {
  onRegisterCallback: PropTypes.func.isRequired,
};

export default RegisterPage;