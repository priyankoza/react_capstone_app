import { Link } from 'react-router-dom';
import greekSalad from './assets/greek-salad.jpg';
import bruschetta from './assets/bruschetta.svg';
import lemonDessert from './assets/lemon-dessert.jpg';

const specials = [
  {
    id: 1,
    name: 'Greek Salad',
    price: '$12.99',
    image: greekSalad,
    description:
      'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
  },
  {
    id: 2,
    name: 'Bruschetta',
    price: '$5.99',
    image: bruschetta,
    description:
      'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
  },
  {
    id: 3,
    name: 'Lemon Dessert',
    price: '$5.00',
    image: lemonDessert,
    description:
      "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
  },
];

function Specials() {
  return (
    <section className="container page-section">
      <div className="section-heading">
        <h2>This week's specials!</h2>
        <Link to="/menu" className="button-primary">Online Menu</Link>
      </div>
      <div className="specials-grid">
        {specials.map((dish) => (
          <article className="card" key={dish.id}>
            <img className="card-image" src={dish.image} alt={dish.name} />
            <div className="card-body">
              <div className="card-title-row">
                <h3 className="card-title">{dish.name}</h3>
                <span className="highlight">{dish.price}</span>
              </div>
              <p>{dish.description}</p>
              <Link to="/order-online" className="card-link">
                Order a delivery
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Specials;