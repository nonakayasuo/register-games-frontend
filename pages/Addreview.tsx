import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

interface Review {
  game_id: number
  play_status: number
  evaluation: number
  category: string
  impression: string
  register_date: Date
}

const AddReviewPage = () => {
  const [newReview, setNewReview] = useState<Review>({
    game_id: 0,
    play_status: 0,
    evaluation: 0,
    category: '',
    impression: '',
    register_date: new Date(),
  })
  const router = useRouter()

  // フォームの送信時に新しいゲームを登録する関数
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        'http://localhost:5000/add_review',
        newReview,
      )
      console.log(res)
      setNewReview({ ...newReview })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>新しいレビューを登録する</h2>
        <div>
          <label htmlFor="game_id">ID</label>
          <input
            type="number"
            id="game_id"
            name="game_id"
            value={newReview.game_id}
            onChange={e =>
              setNewReview({
                ...newReview,
                game_id: parseInt(e.target.value, 10),
              })
            }
          />
        </div>
        <div>
          <label htmlFor="play_status">ゲームプレイ状況</label>
          <input
            type="number"
            id="play_status"
            name="play_status"
            value={newReview.play_status}
            onChange={e =>
              setNewReview({
                ...newReview,
                play_status: parseInt(e.target.value, 5),
              })
            }
          />
        </div>
        <div>
          <label htmlFor="evaluation">評価</label>
          <input
            type="number"
            id="evaluation"
            name="evaluation"
            value={newReview.evaluation}
            onChange={e =>
              setNewReview({
                ...newReview,
                evaluation: parseInt(e.target.value, 5),
              })
            }
          />
        </div>
        <div>
          <label htmlFor="category">カテゴリー</label>
          <input
            type="text"
            id="category"
            name="category"
            value={newReview.category}
            onChange={e =>
              setNewReview({ ...newReview, category: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="impression">感想</label>
          <input
            type="text"
            id="impression"
            name="impression"
            value={newReview.impression}
            onChange={e =>
              setNewReview({ ...newReview, impression: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="register_date">登録日</label>
          <input
            type="date"
            id="register_date"
            name="register_date"
            value={newReview.register_date.toISOString().slice(0, 10)}
            onChange={e => {
              const newDate = new Date(e.target.value)
              setNewReview({ ...newReview, register_date: newDate })
            }}
          />
        </div>
        <button type="submit">登録する</button>
        <br />
        <button onClick={() => router.push('/')}>トップ画面に戻る</button>
      </form>
    </div>
  )
}

export default AddReviewPage
