export class Product {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly price: number,
    readonly sex: string,
    readonly description: string,
    readonly ratingId: number,
    readonly availableSizeQtt: { [size: string]: number },
  ) {}

  isAvailable(size: string) {
    return this.availableSizeQtt[size] > 0;
  }

  getPriceWithDiscount(percentage: number) {
    const discountValue = (this.price / 100) * percentage;

    return this.price - discountValue;
  }

  getPrice() {
    return this.price;
  }
}
