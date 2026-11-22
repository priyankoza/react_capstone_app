import { useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import BookingPage from './BookingPage';
import Chicago from './Chicago';

// Creates the initial state for availableTimes
export const initializeTimes = () => {
  return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
};

// Reducer: changes availableTimes based on the selected date.
// For now it returns the same times regardless of the date.
export const updateTimes = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      // action.date holds the newly selected date (used in a later exercise)
      return initializeTimes();
    default:
      return state;
  }
};

function ComingSoon() {
  return (
    <section className="container page-section">
      <h2>Coming soon</h2>
      <p>This page is under construction.</p>
    </section>
  );
}

function Main() {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

  return (
    <main className="site-main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/booking"
          element={
            <BookingPage availableTimes={availableTimes} dispatch={dispatch} />
          }
        />
        <Route path="/about" element={<Chicago />} />
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </main>
  );
}

export default Main;