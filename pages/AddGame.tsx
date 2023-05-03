import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

interface Game {
  game_id: number
  game_name: string
}

const AddGamePage = () => {
  const [newGame, setNewGame] = useState<Game>({ game_id: 0, game_name: '' })
  const router = useRouter()

  // フォームの送信時に新しいゲームを登録する関数
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/add_game', newGame)
      console.log(res)
      setNewGame({ game_id: 0, game_name: '' })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>新しいゲームを登録する</h2>
        <div>
          <label htmlFor="game_id">ID</label>
          <input
            type="number"
            id="game_id"
            name="game_id"
            value={newGame.game_id}
            onChange={e =>
              setNewGame({ ...newGame, game_id: parseInt(e.target.value, 10) })
            }
          />
        </div>
        <div>
          <label htmlFor="game_name">タイトル</label>
          <input
            type="text"
            id="game_name"
            name="game_name"
            value={newGame.game_name}
            onChange={e =>
              setNewGame({ ...newGame, game_name: e.target.value })
            }
          />
        </div>
        <button type="submit">登録する</button>
        <br />
        <button onClick={() => router.push('/')}>トップ画面に戻る</button>
      </form>
    </div>
  )
}

export default AddGamePage
