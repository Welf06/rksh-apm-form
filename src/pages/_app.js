import '@/styles/globals.css'
import { Montserrat } from 'next/font/google'
import Context from "../../context/context.js"
import React from 'react'

const montserrat = Montserrat({
  subsets: ['latin-ext'],
  weight: 'variable'
})
const AppContext = React.createContext();
export default function App({ Component, pageProps }) {
  return (
    <Context>
  <main className={montserrat.className}>
    <Component {...pageProps} />
  </main>
  </Context>
  );
}
