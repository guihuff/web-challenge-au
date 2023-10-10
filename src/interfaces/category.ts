import { BaseProductProps } from "./product";

export interface CategoryProps {
  id: string;
  name: string;
  description: string;
  products?: BaseProductProps[];
}