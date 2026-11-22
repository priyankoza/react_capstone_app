import { useReducer } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import BookingPage from './BookingPage';
import ConfirmedBooking from './ConfirmedBooking';
import Chicago from './Chicago';
import { fetchAPI, submitAPI } from './api';

// Initial times: available slots for today's date
export const initializeTimes = () => {
  const today = new Date();
  return fetchAPI(today);
};

// Reducer: fetch available slots for the selected date
export const updateTimes = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return fetchAPI(new Date(action.date));
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
  const navigate = useNavigate();

  const submitForm = (formData) => {
    if (submitAPI(formData)) {
      navigate('/confirmed');
    }
  };

  return (
    <main className="site-main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/booking"
          element={
            <BookingPage
              availableTimes={availableTimes}
              dispatch={dispatch}
              submitForm={submitForm}
            />
          }
        />
        <Route path="/confirmed" element={<ConfirmedBooking />} />
        <Route path="/about" element={<Chicago />} />
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </main>
  );
}

export default Main;