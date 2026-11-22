const testimonials = [
  { id: 1, name: 'Maria S.', rating: 5, review: 'The best Greek salad in Chicago. Fresh and delicious!' },
  { id: 2, name: 'James T.', rating: 4, review: 'Lovely atmosphere and friendly staff. We will be back.' },
  { id: 3, name: 'Aisha K.', rating: 5, review: 'Booking was easy and the lemon dessert was amazing.' },
  { id: 4, name: 'Tom R.', rating: 4, review: 'Great food at a fair price. Perfect for family dinners.' },
];

function CustomersSay() {
  return (
    <section className="testimonials">
      <div className="container page-section">
        <h2>Testimonials</h2>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <article className="testimonial-card" key={t.id}>
              <p className="stars" aria-label={`Rated ${t.rating} out of 5 stars`}>
                {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
              </p>
              <div className="customer">
                <span className="avatar" aria-hidden="true">
                  {t.name.charAt(0)}
                </span>
                <h5>{t.name}</h5>
              </div>
              <p>"{t.review}"</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CustomersSay;