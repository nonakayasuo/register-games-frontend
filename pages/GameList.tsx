import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface Game {
  game_id: number
  game_name: string
}

const GameList = () => {
  const [games, setGames] = useState<Game[]>([])

  // バックエンドAPIからゲーム一覧を取得する関数
  const fetchGameList = async () => {
    try {
      const res = await axios.get<Game[]>('http://localhost:5000/game_list')
      setGames(res.data)
      console.log('games', res.data)
    } catch (error) {
      console.error(error)
    }
  }

  // ページ読み込み時にゲーム一覧を取得する
  useEffect(() => {
    fetchGameList()
  }, [])

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>タイトル</th>
        </tr>
      </thead>
      <tbody>
        {games.map(game => (
          <tr key={game.game_id}>
            <td>{game.game_id}</td>
            <td>{game.game_name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default GameList
