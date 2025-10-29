export type books = {
  id: number;
  name: string;
  cover: string;
};

export type book = {
  name: string;
  author: string;
  editor: string;
  year: number;
  read: boolean;
  favorite: boolean;
  rating: number;
  cover: string | null;
  theme: string;
};
