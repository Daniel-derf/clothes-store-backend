export default class Order {
  id: number;
  userId: number;
  productIds: number[];
  totalPrice: number;
  status: string;

  constructor(dto) {
    this.id = dto.id;
    this.userId = dto.userId;
    this.productIds = dto.productIds;
    this.totalPrice = dto.totalPrice;
    this.status = dto.status;
  }
}
