import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">JG Fizz Co (Placeholder)</p>
          <h1>Giftable bath bombs that feel like stepping into a whimsical realm.</h1>
          <p className="hero-text">
            Character-shaped bath bombs designed to feel magical, memorable, and easy to gift.
          </p>
          <a className="cta" href="#shop">Shop the collection</a>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <p className="eyebrow">Why it works</p>
          <h2>We are not selling bath bombs. We are selling small, irresistible gifts.</h2>
        </div>
        <div className="feature-grid">
          <div className="feature-card"><h3>Gift-ready</h3><p>Built for impulse gifting, birthdays, and just-because moments.</p></div>
          <div className="feature-card"><h3>Whimsical designs</h3><p>Gnomes and owls with playful scents and collectible appeal.</p></div>
          <div className="feature-card"><h3>Easy bundles</h3><p>Singles and 3-packs designed to raise average order value.</p></div>
        </div>
      </section>

      <section className="section" id="shop">
        <div className="section-header">
          <p className="eyebrow">Shop</p>
          <h2>Starter collection</h2>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="section section-narrow">
        <div className="section-header">
          <p className="eyebrow">Square setup</p>
          <h2>Checkout is starter-ready</h2>
        </div>
        <p className="body-copy">
          This starter uses a server route where you can either plug in a Square Payment Link or later swap to a custom Square Checkout API flow.
        </p>
      </section>
    </main>
  );
}
