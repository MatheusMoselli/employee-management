import Head from 'next/head'
import Link from 'next/link'

import '../styles/style.css'
import '../styles/form.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Employees Managment</title>
      </Head>

      <div className="top-bar">
        <div className="nav">
          <Link href="/new">
            <a>Add Employee</a>
          </Link>
        </div>

        <div className="grid wrapper">
          <Component {...pageProps} /> 
        </div>
      </div>
    </>
  )
}

export default MyApp
