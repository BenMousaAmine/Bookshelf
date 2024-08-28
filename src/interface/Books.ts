export interface Book {
  id: string;
  title: string;
  author: string;
  synopsis?: string;
  cover?: string;
}
export interface BookCardProps {
  book: Book;
  pathDirctory?: string;
}

export interface LibraryCardProps {
  book: BookLibrary;
  onDelete: (id: string) => void;
  handlePress: () => void;
}

export interface BookLibrary {
  id: string;
  uri: string;
  title: string;
  author: string;
  cover: string;
}
