import { useRouter } from 'next/router'
import { Button } from 'antd'
import GameList from './GameList'

const IndexPage = () => {
  const router = useRouter()

  return (
    <div>
      <h1>ゲームサガ</h1>
      <GameList />
      <Button onClick={() => router.push('/register')}>ゲームを登録する</Button>
    </div>
  )
}

export default IndexPage
