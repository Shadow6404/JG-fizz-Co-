import { products } from '@/data/products';

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug) ?? null;
}
