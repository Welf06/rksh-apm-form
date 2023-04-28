import '@/styles/globals.css'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin-ext'],
  weight: 'variable'
})
export default function App({ Component, pageProps }) {
  return (<main className={montserrat.className}>
    <Component {...pageProps} />
  </main>);
}
