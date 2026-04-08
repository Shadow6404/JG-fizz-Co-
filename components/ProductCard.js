export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img className="product-image" src={product.image} alt={product.name} />
      </div>
      <div className="product-content">
        <div className="product-meta">
          <h3>{product.name}</h3>
          <p className="price">{product.priceLabel}</p>
        </div>
        <p className="product-description">{product.description}</p>
        <form action="/api/checkout" method="POST">
          <input type="hidden" name="productSlug" value={product.slug} />
          <button className="buy-button" type="submit">Buy with Square</button>
        </form>
      </div>
    </article>
  );
}
