export interface GraphSearchResult {
  id: number;
  type: string;
  title: string;
  poster: string;
  summary: string;
  network: string;
  platforms: string[];
  genres: string[];
  inList?: boolean;
  listId?: string;
  itemId?: string;
}

export interface SearchResultProps extends GraphSearchResult {
  addToList: (id: string, contents: string) => void;
  deleteFromList: (id: string) => void;
}
