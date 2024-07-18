import PropTypes from 'prop-types';
import { useEffect } from 'react';

const LogoutPage = ({ onAppear }) => {
  useEffect(() => {
    setTimeout(onAppear, 1000);
  }, [onAppear]);

  return (
    <div className="LogoutPage">
      <h2>Logging out...</h2>
    </div>
  );
};

LogoutPage.propTypes = {
  onAppear: PropTypes.func.isRequired,
};

export default LogoutPage;