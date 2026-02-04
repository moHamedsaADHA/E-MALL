export interface ICartItemDTO {
  id?: string;
  productId: string;
  shopId: string;
  quantity: number;
  price: string; // numeric as string for precision
}

export interface ICartDTO {
  id?: string;
  userId: string;
  items: ICartItemDTO[];
}
