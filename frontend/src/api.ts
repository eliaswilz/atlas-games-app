import axios from 'axios';

const API_URL = 'http://localhost:8000';

export interface Category {
  id: number;
  name: string;
}

export interface Game {
  id: number;
  name: string;
  category_id: number;
  category: Category;
  last_played?: string;
  play_count: number;
}

export const api = {
  getCategories: () => axios.get<Category[]>(`${API_URL}/categories/`),
  getGames: () => axios.get<Game[]>(`${API_URL}/games/`),
  createCategory: (name: string) => axios.post<Category>(`${API_URL}/categories/`, { name }),
  createGame: (game: { name: string; category_id: number }) => axios.post<Game>(`${API_URL}/games/`, game),
  playGame: (gameId: number) => axios.post<Game>(`${API_URL}/games/${gameId}/play`),
};
