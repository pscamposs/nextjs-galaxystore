export enum FilterType {
  GERAL,
  ECONOMIA,
  MECANICA,
  FACTIONS,
  OPCIONAIS,
}

export interface Category {
  id: string;
  icon: string;
  name: string;
}

export interface Plugin {
  id: string;
  name: string;
  category: Category;
  description: string;
  image: string;
  price: number;
  version: string;
}

export interface ICart {
  cartId: string;
  plugins: Plugin[];
}

export interface UserProfile {
  username: string;
  email: string;
  role: string;
  createdAt: string;
  plugins: Plugin[];
}
