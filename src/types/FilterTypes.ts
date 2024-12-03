export enum FilterType {
  GERAL,
  ECONOMIA,
  MECANICA,
  FACTIONS,
  OPCIONAIS,
}

interface Update {
  id: string;
  version: string;
  description: string;
  createdAt: string;
  updatedAt: string;
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
  downloads: number;
  image: string;
  price: number;
  version: Update;
  updates: Update[];
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
