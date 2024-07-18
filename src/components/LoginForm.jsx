import { useState, useId } from 'react';
import PropTypes from 'prop-types';
import './LoginForm.css';

// It can be convenient to declare an object of function to represent
// or build the default values for the state when we use an object
// as the state so that it's easy to set/reset
const kNewFormData = {
  email: '',
  password: '',
};

const LoginForm = ({ onLoginCallback }) => {
  const formId = useId();
  const [userData, setUserData] = useState(kNewFormData);

  const id = (name) => `${formId}-${name}`;

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setUserData(oldData => ({ ...oldData, [fieldName]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userData.email) { return; }
    if (!userData.password) { return; }

    setUserData(kNewFormData);
    onLoginCallback({
      ...userData, 
    });
  };

	return (
		<form onSubmit={handleSubmit} className="login__form">
			<section>
				<div className="login__fields">
					<label htmlFor={id('email')}>Email</label>
					<input
						name="email"
						id={id('email')}
						value={userData.email}
						onChange={handleChange}
					/>
					<label htmlFor={id('password')}>Password</label>
					<input
						name="password"
            type='password'
						id={id('password')}
						value={userData.password}
						onChange={handleChange}
					/>
					<button className="button login__submit" type="submit">
						Login
					</button>
				</div>
			</section>
		</form>
	);
};

LoginForm.propTypes = {
	onLoginCallback: PropTypes.func.isRequired,
};

export default LoginForm;