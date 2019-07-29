import { Cart } from './cart.model';
export class ProductSelection{

  constructor(
    public cart: Cart,
    public productId?: number,
    public price?: number,
    public name?: string,
    private quantityValue?: number
  ) {}

  get quantity(){
    return this.quantityValue;
  }

  set quantity(value: number){
    this.quantityValue = value;
    this.cart.update();
  }

  getData():ProductSelectionData{
    let data:ProductSelectionData={
      name:this.name,
      price: this.price,
      productId: this.productId,
      quantity: this.quantityValue
    }
    return data;
  }

  setData(data: ProductSelectionData):void{
    this.name=data.name;
    this.price=data.price;
    this.productId=data.productId;
    this.quantity = data.quantity;
  }
}

export interface ProductSelectionData{
  productId?: number,
  name?: string,
  price?: number,
  quantity?: number
}
