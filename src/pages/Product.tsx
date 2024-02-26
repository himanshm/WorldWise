import styles from './Product.module.css';
import firstImage from '../assets/img-1.jpg';

function ProductPage() {
  return (
    <main className={styles.product}>
      <section>
        <img
          src={firstImage}
          alt='person with dog overlooking mountain with sunset'
        />
        <div>
          <h2>About WorldWide.</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
            dicta illum vero culpa cum quaerat architecto sapiente eius non
            soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
            perspiciatis?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
            doloribus libero sunt expedita ratione iusto, magni, id sapiente
            sequi officiis et.
          </p>
        </div>
      </section>
    </main>
  );
}

export default ProductPage;
