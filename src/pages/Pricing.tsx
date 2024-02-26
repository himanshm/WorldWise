import styles from './Product.module.css';

import secondImage from '../assets/img-2.jpg';
import MainNavigation from '../components/layout/MainNavigation';

function PricingPage() {
  return (
    <main className={styles.product}>
      <MainNavigation />

      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
            labore mollitia iusto. Recusandae quos provident, laboriosam fugit
            voluptatem iste.
          </p>
        </div>
        <img
          src={secondImage}
          alt='overview of a large city with skyscrapers'
        />
      </section>
    </main>
  );
}

export default PricingPage;
