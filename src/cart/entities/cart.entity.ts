export default class Cart {
  id: number;
  userId: number;
  products: CartProduct[];

  constructor(cartDto: CartDto) {
    this.id = cartDto.id;
    this.userId = cartDto.userId;
    this.products = cartDto.products;
  }

  addProduct({ productId, productSize, productQuantity }: Input) {
    if (productQuantity <= 0) {
      throw new Error('Invalid product quantity');
    }

    const productIdx = this.products.findIndex(
      (product) => product[0] === productId,
    );

    const isExistent = productIdx != -1;

    if (isExistent) {
      this.products[productIdx].productQuantity += productQuantity;
      return;
    }

    const newProduct = { productId, productSize, productQuantity };

    this.products.push(newProduct);
  }

  getProducts() {
    return this.products;
  }
}

type CartProduct = {
  productId: number;
  productSize: string;
  productQuantity: number;
};

type CartDto = {
  id: number;
  userId: number;
  products: CartProduct[];
};

type Input = {
  productId: number;
  productQuantity: number;
  productSize: string;
};
