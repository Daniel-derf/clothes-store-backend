export class Product {
  id: number;
  name: string;
  price: number;
  sex: string;
  description: string;
  ratingId: number;
  availableSizeQtt: { [size: string]: number };
  appliedDiscountPercentage: number;
  imageUrl: string;

  constructor(props: NewProductProps) {
    this.id = props.id;
    this.name = props.name;
    this.price = Number(props.price);
    this.sex = props.sex;
    this.description = props.description;
    this.ratingId = props.ratingId;
    this.availableSizeQtt = props.availableSizeQtt;
    this.imageUrl = props.image_url;
  }

  isAvailable(size: string) {
    return this.availableSizeQtt[size] > 0;
  }

  isAvailableToQuantity(size: string, quantity: number) {
    return this.availableSizeQtt[size] >= quantity;
  }

  getAvailableExemplars(size: string) {
    return this.availableSizeQtt[size];
  }

  removeAppliedDiscount() {
    if (this.appliedDiscountPercentage) {
      this.price += (this.price / 100) * this.appliedDiscountPercentage;

      return;
    }

    throw new Error(`There is no applied discount in this product`);
  }

  applyDiscount(percentage: number) {
    if (this.appliedDiscountPercentage) {
      this.removeAppliedDiscount();
    }

    const discountValue = (this.price / 100) * percentage;

    this.appliedDiscountPercentage = percentage;

    this.price -= discountValue;
  }

  getPrice() {
    return this.price;
  }
}

type NewProductProps = {
  id: number;
  name: string;
  price: number;
  sex: string;
  description: string;
  ratingId: number;
  availableSizeQtt: { [size: string]: number };
  image_url?: string;
  appliedDiscountPercentage?: number;
};
