    import marioAdrianA from './assets/mario-adrian-a.jpg';
import marioAdrianB from './assets/mario-adrian-b.jpg';

function Chicago() {
  return (
    <section className="container page-section about-grid">
      <div>
        <h1 className="about-title">Little Lemon</h1>
        <h2>Chicago</h2>
        <p>
          Little Lemon is owned by two Italian brothers, Mario and Adrian, who
          moved to the United States to pursue their shared dream of owning a
          restaurant.
        </p>
        <p>
          To craft the menu, Mario relies on family recipes and his experience
          as a chef in Italy. Adrian does all the marketing for the restaurant
          and led the effort to expand the menu beyond classic Italian to
          incorporate additional cuisines from the Mediterranean region.
        </p>
      </div>
      <div className="about-images">
        <img className="photo about-img-back" src={marioAdrianA} alt="Mario and Adrian in the kitchen" />
        <img className="photo about-img-front" src={marioAdrianB} alt="Mario and Adrian laughing together" />
      </div>
    </section>
  );
}

export default Chicago;