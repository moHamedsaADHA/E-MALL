export interface IProductDTO {
  id?: string;
  title: string;
  description?: string;
  price: number;
  shopId: string;
  categoryId?: string | null;
}
