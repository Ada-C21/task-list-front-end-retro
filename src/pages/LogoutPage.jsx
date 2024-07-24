import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

const LogoutPage = ({ onAppear }) => {
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setTimeout(onAppear, 1000);

    return () => {
      clearTimeout(timer.current);
    };
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