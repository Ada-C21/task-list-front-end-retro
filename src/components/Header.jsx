import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ name, defaultName }) => {
  if (name.length === 0) {
    name = defaultName;
  }

  return (
    <header className="Header">
      <h1>{name}&apos;s Task List</h1>
    </header>
  );
};

Header.propTypes = {
  name: PropTypes.string.isRequired,
  defaultName: PropTypes.string.isRequired,
};

export default Header;