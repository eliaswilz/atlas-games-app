import React from 'react';
import { Game } from './api';

interface GameChartProps {
  selectedGames: Game[];
  theme: string;
}

const GameChart: React.FC<GameChartProps> = ({ selectedGames, theme }) => {
  const starterGame = selectedGames.find(g => g.category.name === 'Starter Games');
  const enderGame = selectedGames.find(g => g.category.name === 'Ender Games');
  const mainGames = selectedGames.filter(g => g.category.name !== 'Starter Games' && g.category.name !== 'Ender Games');

  return (
    <div className="game-chart">
      {starterGame && (
        <div className="starter-game-slot">
          <div className="game-slot starter">{starterGame.name}</div>
        </div>
      )}
      <div className="teams-container">
        <div className="team-label">Team 1</div>
        <div className="team-label">Team 2</div>
      </div>
      <div className="main-games-container">
        <div className="team-games">
          {mainGames.filter((_, index) => index % 2 === 0).map((game, index) => (
            <div key={game.id} className="game-slot team1">{game.name}</div>
          ))}
        </div>
        <div className="team-games">
          {mainGames.filter((_, index) => index % 2 === 1).map((game, index) => (
            <div key={game.id} className="game-slot team2">{game.name}</div>
          ))}
        </div>
      </div>
      {theme && <div className="theme-label">Theme: {theme}</div>}
      {enderGame && (
        <div className="ender-game-slot">
          <div className="game-slot ender">{enderGame.name}</div>
        </div>
      )}
    </div>
  );
};

export default GameChart;
