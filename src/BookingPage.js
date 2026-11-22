import BookingForm from './BookingForm';

function BookingPage({ availableTimes, dispatch }) {
  return (
    <section className="container page-section">
      <h2>Reserve a Table</h2>
      <p>
        Choose your date, time, number of guests and occasion to book your
        table at Little Lemon.
      </p>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
    </section>
  );
}

export default BookingPage;