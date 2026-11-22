import { Link } from 'react-router-dom';
import heroImage from './assets/hero.jpg';

function CallToAction() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-text">
          <h1>Little Lemon</h1>
          <h2>Chicago</h2>
          <p className="lead">
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </p>
          <Link to="/booking" className="button-primary" aria-label="On Click">
            Reserve a Table
          </Link>
        </div>
        <img className="photo hero-image" src={heroImage} alt="Waiter serving plates of food" />
      </div>
    </section>
  );
}

export default CallToAction;