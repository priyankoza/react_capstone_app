import logo from './images/Logo.svg';

function Header() {
  return (
    <header className="site-header">
      <img src={logo} alt="Little Lemon logo" />
    </header>
  );
}

export default Header;