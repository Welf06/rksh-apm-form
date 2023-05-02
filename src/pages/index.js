import { useRouter } from "next/router";
import  { useEffect } from 'react';


export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/form')
  }, [])
  return(
    <>
      <div>
        Redirecting to the Form
      </div>
    </>
  )
}