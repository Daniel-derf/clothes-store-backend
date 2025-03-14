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
}
