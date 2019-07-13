import { Product } from './product.model';

export class Rating{
  constructor(
    public rating?: number,
    public stars?: number,
    public product?: Product
  ){}
}
