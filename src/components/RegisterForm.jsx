import { useState, useId } from 'react';
import PropTypes from 'prop-types';
import './RegisterForm.css';

// It can be convenient to declare an object of function to represent
// or build the default values for the state when we use an object
// as the state so that it's easy to set/reset
const kNewFormData = {
  name: '',
  email: '',
  password: '',
};

const RegisterForm = ({ onRegisterCallback }) => {
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

    if (!userData.name) { return; }
    if (!userData.email) { return; }
    if (!userData.password) { return; }

    setUserData(kNewFormData);
    onRegisterCallback({
      ...userData, 
    });
  };

	return (
		<form onSubmit={handleSubmit} className="register__form">
			<section>
				<div className="register__fields">
					<label htmlFor={id('name')}>Name</label>
					<input
						name="name"
						id={id('name')}
						value={userData.name}
						onChange={handleChange}
					/>
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
					<button className="button register__submit" type="submit">
						Register
					</button>
				</div>
			</section>
		</form>
	);
};

RegisterForm.propTypes = {
	onRegisterCallback: PropTypes.func.isRequired,
};

export default RegisterForm;