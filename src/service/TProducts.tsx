export interface Product {
  id: string,
  title: string,
  description: string,
  price: string,
  discountPercentage: number,
  rating: number,
  stock: number,
  brand: string,
  category: string,
  thumbnail: string,
  images: string[],
}

export interface Products {
  products: Product[],
}