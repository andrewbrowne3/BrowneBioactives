export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  category: 'immune' | 'energy' | 'cognitive' | 'recovery' | 'longevity' | 'performance';
  benefits: string[];
  ingredients: string[];
  servingSize: string;
  servingsPerContainer: number;
  usage: string;
  warnings?: string;
  inStock: boolean;
  featured?: boolean;
  tags: string[];
}

export interface CartItem extends Product {
  quantity: number;
}
