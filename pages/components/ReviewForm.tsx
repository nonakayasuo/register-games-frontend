import React from 'react'
import { Form, Input, Button, DatePicker } from 'antd'
import { useRouter } from 'next/router'

interface Props {
  form: any
  onFinish: (values: any) => void
}

const ReviewForm = (props: Props) => {
  const { form, onFinish } = props
  const router = useRouter()

  return (
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
        name={['category']}
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
  )
}

export default ReviewForm
