export default class Wishlist {
  id: number;
  userId: number;
  productsIds: number[];

  constructor({ id, userId, productsIds }) {
    this.id = id;
    this.userId = userId;
    this.productsIds = productsIds;
  }

  addProducts(productsIds: number[]) {
    productsIds.forEach((id) => {
      const productIsNotAdded = this.productsIds.indexOf(id) === -1;

      if (productIsNotAdded) this.productsIds.push(id);
    });
  }

  removeProducts(productsIds: number[]) {
    const notFoundProducts = productsIds.filter((id) => {
      if (this.productsIds.indexOf(id) === -1) return true;
      return false;
    });

    if (notFoundProducts.length)
      throw new Error(
        `The following IDs were not found: ${notFoundProducts.join(', ')}`,
      );

    const newProductsIds = this.productsIds.filter((id) => {
      if (productsIds.indexOf(id) !== -1) return false;
      return true;
    });

    this.productsIds = newProductsIds;
  }
}
