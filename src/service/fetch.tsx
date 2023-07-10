import { Products } from "./TProducts";

export const fetchProducts = async (url: string): Promise<Products> => {
  const response = await fetch(url);
  const responseData: unknown | Products = await response.json();
  const data: Products = responseData as Products;
  return data as unknown as Products;
};
