import { Link } from 'react-router-dom';

function ConfirmedBooking() {
  return (
    <section className="container page-section confirmed-booking">
      <h2>Booking Confirmed!</h2>
      <p>
        Thank you for reserving a table at Little Lemon. Your booking has been
        confirmed, and we look forward to welcoming you.
      </p>
      <Link to="/" className="button-primary">
        Back to Home
      </Link>
    </section>
  );
}

export default ConfirmedBooking;