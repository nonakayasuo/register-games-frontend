import React, { useState, useEffect } from 'react'
import { Form } from 'antd'
import { useRouter } from 'next/router'
import axios from 'axios'
import ReviewForm from '../components/ReviewForm'
import moment from 'moment'

interface Game {
  game_id: number
  game_name: string
}

interface Review {
  play_status: number
  evaluation: number
  category: string
  impression: string
  register_date: Date
}

const AddReviewPage = props => {
  const { gameId } = props
  const [form] = Form.useForm()
  const [game, setGame] = useState<Game>({ game_id: 1, game_name: '' })
  const [existReview, setExistReview] = useState<Review | null>(null) // 既存のレビュー情報
  const [newReview, setNewReview] = useState<Review>({
    // 新しいレビュー情報
    play_status: 0,
    evaluation: 0,
    category: '',
    impression: '',
    register_date: new Date(),
  })
  const router = useRouter()

  // ページ読み込み時にゲーム情報と既存のレビュー情報を取得する
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const [gameRes, reviewRes] = await Promise.all([
          axios.get<Game>(`http://localhost:5000/game_list/${gameId}`),
          axios.get<Review>(`http://localhost:5000/review/${gameId}`),
        ])
        setGame(gameRes.data) // 取得したゲーム情報をセットする
        setExistReview(reviewRes.data) // 取得した既存のレビュー情報をセットする
      } catch (error) {
        console.error(error)
      }
    }

    fetchGame()
  }, [gameId])

  // フォームの送信時に新しいレビューを登録する関数
  const onFinish = async (values: any) => {
    try {
      const data = { ...newReview, ...values, game_id: game.game_id }
      console.log('data', data)
      const res = await axios.post(
        'http://localhost:5000/add_review',
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      console.log(res)
      form.resetFields()
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  // 既存のレビュー情報がある場合はフォームにセットする
  useEffect(() => {
    if (existReview) {
      const reviews = (existReview as Review).find(e => e.game_id)
      form.setFieldsValue({
        play_status: reviews.play_status,
        evaluation: reviews.evaluation,
        category: reviews.category,
        impression: reviews.impression,
        register_date: moment(reviews.register_date),
      })
      setNewReview(existReview)
    }
  }, [existReview, form])

  return (
    <div>
      <h2>{game.game_name}のレビューを登録する</h2>
      <ReviewForm form={form} onFinish={onFinish} />
    </div>
  )
}

export default AddReviewPage
