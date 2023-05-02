import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Game {
  game_id: number;
  game_name: string;
}

const IndexPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [newGame, setNewGame] = useState<Game>({ game_id: 0, game_name: '' });

  // バックエンドAPIからゲーム一覧を取得する関数
  const fetchGameList = async () => {
    try {
      const res = await axios.get<Game[]>('http://localhost:5000/game_list');
      const gameList = res.data.map(game => ({
        game_id: game.game_id,
        game_name: game.game_name
      }));
      
      setGames(gameList);
    } catch (error) {
      console.error(error);
    }
  };

  // ページ読み込み時にゲーム一覧を取得する
  useEffect(() => {
    fetchGameList();
  }, []);

  // フォームの送信時に新しいゲームを登録する関数
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/add_game', newGame);
      console.log(res);
      setNewGame({ game_id: 0, game_name: '' });
      fetchGameList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>ゲーム一覧</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>タイトル</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.game_id}>
              <td>{game.game_id}</td>
              <td>{game.game_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <h2>新しいゲームを登録する</h2>
        <div>
          <label htmlFor="input-game-id">ID</label>
          <input
            type="number"
            id="input-game-id"
            name="input-game-id"
            value={newGame.game_id}
            onChange={(e) =>
              setNewGame({ ...newGame, game_id: parseInt(e.target.value, 10) })
            }
          />
        </div>
        <div>
          <label htmlFor="input-game-name">タイトル</label>
          <input
            type="text"
            id="input-game-name"
            name="input-game-name"
            value={newGame.game_name}
            onChange={(e) =>
              setNewGame({ ...newGame, game_name: e.target.value })
            }
          />
        </div>
        <button type="submit">登録する</button>
      </form>
    </div>
  );
};

export default IndexPage;
