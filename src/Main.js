import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import BookingPage from './BookingPage';
import Chicago from './Chicago';

function ComingSoon() {
  return (
    <section className="container page-section">
      <h2>Coming soon</h2>
      <p>This page is under construction.</p>
    </section>
  );
}

function Main() {
  return (
    <main className="site-main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/about" element={<Chicago />} />
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </main>
  );
}

export default Main;