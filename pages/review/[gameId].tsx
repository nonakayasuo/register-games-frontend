import { useRouter } from 'next/router'
import AddReviewPage from '../components/Review'

const GameReview = () => {
  const router = useRouter()
  const { gameId } = router.query

  // ページのクエリパラメータからゲームIDを取得する
  return <AddReviewPage gameId={gameId} />
}

export default GameReview
