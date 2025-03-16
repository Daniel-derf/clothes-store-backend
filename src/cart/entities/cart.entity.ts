export default class Cart {
  id: number;
  userId: number;
  products: CartProduct[];

  constructor(cartDto: CartDto) {
    this.id = cartDto.id;
    this.userId = cartDto.userId;
    this.products = cartDto.products;
  }

  addProduct({ productId, productSize, quantity }: Input) {
    if (quantity <= 0) {
      throw new Error('Invalid product quantity');
    }

    const productIdx = this.products.findIndex(
      (product) => product[0] === productId,
    );

    const isExistent = productIdx != -1;

    if (isExistent) {
      this.products[productIdx].quantity += quantity;
      return;
    }

    const newProduct = { productId, productSize, quantity };

    this.products.push(newProduct);
  }
}

type CartProduct = {
  productId: number;
  productSize: string;
  quantity: number;
};

type CartDto = {
  id: number;
  userId: number;
  products: CartProduct[];
};

type Input = {
  productId: number;
  quantity: number;
  productSize: string;
};
