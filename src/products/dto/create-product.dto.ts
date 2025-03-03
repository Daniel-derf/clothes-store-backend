export class CreateProductDto {
  name: string;
  price: number;
  sex: string;
  description: string;
  ratingId: number;
  availableSizeQtt: { [size: string]: number };
}
