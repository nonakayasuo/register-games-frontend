import { useRouter } from 'next/router'
import GameList from './GameList'

const IndexPage = () => {
  const router = useRouter()

  return (
    <div>
      <h1>ゲームサガ</h1>
      <GameList />
      <button onClick={() => router.push('/add_game')}>ゲームを登録する</button>
      <br />
      <button onClick={() => router.push('/add_review')}>
        ゲームのレビューをする
      </button>
    </div>
  )
}

export default IndexPage
