export interface Game {
  id: number;
  name: string;
  category_id: number;
  last_played: string;
  play_count: number;
}

export interface Category {
  id: number;
  name: string;
  games: Game[];
}
