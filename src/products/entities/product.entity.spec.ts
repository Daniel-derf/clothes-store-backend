import { Product } from './product.entity';

describe('Product', () => {
  let product: Product;

  beforeEach(() => {
    product = new Product(
      1,
      'camiseta',
      100,
      'GG',
      'M',
      'nova descricao',
      1,
      10,
    );
  });

  it('should be defined', () => {
    expect(product).toBeDefined();
  });

  it('should return true if the product is available', () => {
    expect(product.isAvailable()).toBe(true);
  });

  it('should return false if the product is not available', () => {
    const unavailableProduct = new Product(
      2,
      'calça',
      150,
      'M',
      'F',
      'nova descricao',
      2,
      0,
    );
    expect(unavailableProduct.isAvailable()).toBe(false);
  });

  it('should return the correct price with discount', () => {
    const discount = 10; // 10%
    const expectedPrice = 90; // 100 - 10% of 100
    expect(product.getPriceWithDiscount(discount)).toBe(expectedPrice);
  });

  it('should return the correct price', () => {
    expect(product.getPrice()).toBe(100);
  });
});
