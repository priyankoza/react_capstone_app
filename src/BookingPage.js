import BookingForm from './BookingForm';

function BookingPage() {
  return (
    <section className="container page-section">
      <h2>Reserve a Table</h2>
      <p>
        Choose your date, time, number of guests and occasion to book your
        table at Little Lemon.
      </p>
      <BookingForm />
    </section>
  );
}

export default BookingPage;