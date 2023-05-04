import React, { useState, useEffect } from 'react'
import { Form, Input, Button, DatePicker } from 'antd'
import { useRouter } from 'next/router'
import axios from 'axios'

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

const AddReviewPage = () => {
  const [form] = Form.useForm()
  const [game, setGame] = useState<Game>({ game_id: 0, game_name: '' })
  const [newReview, setNewReview] = useState<Review>({
    play_status: 0,
    evaluation: 0,
    category: '',
    impression: '',
    register_date: new Date(),
  })
  const router = useRouter()

  // ページのクエリパラメータからゲームIDを取得する
  const { gameId } = router.query

  // ページ読み込み時にゲーム情報を取得する
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await axios.get<Game>(
          `http://localhost:5000/game_list/${gameId}`,
        )
        setGame(res.data)
        console.log('game', res.data)
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

  return (
    <div>
      <h2>{game.game_name}のレビューを登録する</h2>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="play_status"
          label="ゲームプレイ状況"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item name="evaluation" label="評価" rules={[{ required: false }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="category"
          label="カテゴリー"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="impression" label="感想" rules={[{ required: false }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="register_date"
          label="登録日"
          rules={[{ required: true }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            登録する
          </Button>
          <Button onClick={() => router.push('/')}>トップ画面に戻る</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddReviewPage
