import type { AppProps } from 'next/app'
// import '../../styles/chart.css'
import Chart from 'chart.js/auto'
// import 'chartjs-adapter-date-fns'
import StreamingPlugin from 'chartjs-plugin-streaming'
Chart.register(StreamingPlugin)

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App