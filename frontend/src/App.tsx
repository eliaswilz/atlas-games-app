import React, { useState, useEffect } from 'react';
import { api, Category, Game } from './api';
import GameChart from './GameChart';
import './App.css';

const App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newGameName, setNewGameName] = useState('');
  const [newGameCategoryId, setNewGameCategoryId] = useState<number | ''>('');
  const [selectedGames, setSelectedGames] = useState<Game[]>([]);
  const [theme, setTheme] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesResponse, gamesResponse] = await Promise.all([
        api.getCategories(),
        api.getGames(),
      ]);
      setCategories(categoriesResponse.data);
      setGames(gamesResponse.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      if (err instanceof Error) {
        setError(`Failed to fetch data: ${err.message}`);
      } else {
        setError('An unknown error occurred while fetching data');
      }
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createCategory(newCategoryName);
      setNewCategoryName('');
      fetchData();
    } catch (err) {
      console.error('Error creating category:', err);
      setError('Failed to create category. Please try again.');
    }
  };

  const handleCreateGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof newGameCategoryId !== 'number') return;
    try {
      await api.createGame({ name: newGameName, category_id: newGameCategoryId });
      setNewGameName('');
      setNewGameCategoryId('');
      fetchData();
    } catch (err) {
      console.error('Error creating game:', err);
      setError('Failed to create game. Please try again.');
    }
  };

  const handleSelectGame = (game: Game) => {
    setSelectedGames(prev => {
      const isAlreadySelected = prev.some(g => g.id === game.id);
      if (isAlreadySelected) {
        return prev.filter(g => g.id !== game.id);
      } else {
        const newSelected = [...prev];
        if (game.category.name === 'Starter Games' && newSelected.length > 0 && newSelected[0].category.name !== 'Starter Games') {
          newSelected.unshift(game);
        } else if (game.category.name === 'Ender Games' && newSelected.length > 0 && newSelected[newSelected.length - 1].category.name !== 'Ender Games') {
          newSelected.push(game);
        } else {
          const insertIndex = newSelected.findIndex(g => g.category.name === 'Ender Games');
          if (insertIndex === -1) {
            newSelected.push(game);
          } else {
            newSelected.splice(insertIndex, 0, game);
          }
        }
        return newSelected.slice(0, 8); // Limit to 8 games (1 starter, 6 main, 1 ender)
      }
    });
  };

  const handlePlayGames = async () => {
    try {
      await Promise.all(selectedGames.map(game => api.playGame(game.id)));
      setSelectedGames([]);
      fetchData();
    } catch (err) {
      console.error('Error playing games:', err);
      setError('Failed to update game play counts. Please try again.');
    }
  };

  const gamesByCategory = categories.map(category => ({
    category,
    games: games.filter(game => game.category_id === category.id)
  }));

  const starterGames = gamesByCategory.find(c => c.category.name === 'Starter Games')?.games || [];
  const enderGames = gamesByCategory.find(c => c.category.name === 'Ender Games')?.games || [];
  const otherGames = gamesByCategory.filter(c => c.category.name !== 'Starter Games' && c.category.name !== 'Ender Games')
    .flatMap(c => c.games);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="app-container">
      <h1>Atlas Games App</h1>

      <section className="games-section">
        <h2>Games</h2>
        <div className="game-buttons">
          {[...starterGames, ...otherGames, ...enderGames].map((game) => (
            <button
              key={game.id}
              onClick={() => handleSelectGame(game)}
              className={`game-button ${game.category.name.toLowerCase().replace(' ', '-')} ${selectedGames.some(g => g.id === game.id) ? 'selected' : ''}`}
              style={{
                fontSize: `${Math.max(0.8, Math.min(1.5, 0.8 + game.play_count / 20))}em`,
                backgroundColor: game.category.name === 'Starter Games' ? '#ffa500' :
                                 game.category.name === 'Ender Games' ? '#90ee90' :
                                 `hsl(${game.category_id * 137.508 % 360}, 70%, 50%)`
              }}
            >
              {game.name}
            </button>
          ))}
        </div>
        <button onClick={handlePlayGames} className="play-games-button" disabled={selectedGames.length === 0}>
          Play Selected Games
        </button>
      </section>

      <section className="game-chart-section">
        <h2>Selected Games</h2>
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="Enter theme"
          className="theme-input"
        />
        <GameChart
    selectedGames={selectedGames}
    theme={theme}
  />
      </section>

      <section className="form-section">
        <form onSubmit={handleCreateCategory} className="form">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="New category name"
            className="input"
          />
          <button type="submit" className="button">Add Category</button>
        </form>
        <form onSubmit={handleCreateGame} className="form">
          <input
            type="text"
            value={newGameName}
            onChange={(e) => setNewGameName(e.target.value)}
            placeholder="New game name"
            className="input"
          />
          <select
            value={newGameCategoryId}
            onChange={(e) => setNewGameCategoryId(Number(e.target.value))}
            className="select"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button type="submit" className="button">Add Game</button>
        </form>
      </section>
    </div>
  );
};

export default App;
