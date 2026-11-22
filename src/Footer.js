import logo from './images/Logo.svg';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <img src={logo} alt="Little Lemon logo" />

        <section>
          <h4>Navigation</h4>
          <nav aria-label="Footer navigation">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/menu">Menu</a></li>
              <li><a href="/reservations">Reservations</a></li>
              <li><a href="/order-online">Order Online</a></li>
              <li><a href="/login">Login</a></li>
            </ul>
          </nav>
        </section>

        <section>
          <h4>Contact</h4>
          <address>
            123 Main Street<br />
            Chicago, IL
          </address>
          <p>(312) 555-0123</p>
          <p>contact@littlelemon.com</p>
        </section>

        <section>
          <h4>Social Media</h4>
          <ul>
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Little Lemon on Facebook (opens in a new tab)"
              >
                Facebook
              </a>
            </li>
            <li><a href="https://www.instagram.com" target="_blank"
              rel="noopener noreferrer"
              aria-label="Little Lemon on Instagram (opens in a new tab)"
            >Instagram</a></li>
            <li><a href="https://www.twitter.com" target="_blank"
              rel="noopener noreferrer"
              aria-label="Little Lemon on Twitter (opens in a new tab)"
            >Twitter</a></li>
          </ul>
        </section>
      </div>
    </footer>
  );
}

export default Footer;