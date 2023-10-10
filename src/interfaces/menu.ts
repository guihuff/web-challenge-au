import { CategoryProps } from "./category";

export interface CreateMenuProps {
  name: string;
  products: {id_product: string}[];
  time: string,
  isActive: boolean;
}


export interface MenuProps {
  id: string
  name: string
  time: string
  isActive: boolean
  products: Product[]
}

interface Product {
  product: ProductObject
}

interface ProductObject {
  id: string;
  name: string;
  description: string;
  category: CategoryProps;
  image?: string;
  price: number;
}
