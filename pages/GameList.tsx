import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import axios from 'axios'
import Link from 'next/link'

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

  // テーブルのカラム設定
  const columns = [
    {
      title: 'ゲームタイトル',
      dataIndex: 'game_name',
      key: 'game_name',
      // レコードをクリックしたら、/reviews/:idに遷移するように設定する
      render: (text: string, record: Game) => (
        <Link href={`/${record.game_id}`}>{text}</Link>
      ),
    },
  ]

  return <Table dataSource={games} columns={columns} />
}

export default GameList
