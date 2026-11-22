import { Link } from 'react-router-dom';
import logo from './images/Logo.svg';

function Header() {
  return (
    <header className="site-header">
      <Link to="/" aria-label="Little Lemon home page">
        <img src={logo} alt="Little Lemon logo" />
      </Link>
    </header>
  );
}

export default Header;