
export interface BaseProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imageURL: string;
  category?: CategoryBaseProps;
}

interface CategoryBaseProps {
  id: string;
  name: string;
}