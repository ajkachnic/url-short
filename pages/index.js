import Head from 'next/head'
import fetchSwal from '../lib/fetchSwal'
import { useState } from 'react'
import { useRouter } from 'next/router'
const Home = () => {
  const router = useRouter();
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')
  const [lookupMessage, setLookupMessage] = useState('')
  const [keyToCheck, setKeyToCheck] = useState('')
  const createURL = (event) => {
    event.preventDefault();
    fetchSwal.post('/api/shorten', {
      redirectUrl: url
    })
    .then(data => {
      setMessage(`The URL is ${process.env.SERVER_URL}/!/${data.data.linkId}`)
    })
    .catch(err => console.log(err))
  }
  const checkURL = (event)  => {
    event.preventDefault();
    fetchSwal.post('/api/lookup', {
      linkId: keyToCheck
    })
    .then(data => {
      try {
        setLookupMessage(`It redirects to ${data.data.redirectUrl}`)
      }
      catch {
        throw new Error("URL Not found")
      }
    }).catch(err => {
      console.log(err)
    })
  }
  return (
  <div className="container">
    <Head>
      <title>Short A URL</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className="title">
        Shorten A URL
      </h1>
      <p>{message}</p>
      <form onSubmit={createURL}>
        <input value={url} onChange={val => setUrl(val.target.value)} placeholder="URL To Shorten"/>
        <button type="submit">Shorten</button>
      </form>
    </main>
    <h1 className="title">
      Check A URL
    </h1>

    <p>{lookupMessage}</p>
    <form onSubmit={checkURL}>
        <input value={keyToCheck} onChange={val => setKeyToCheck(val.target.value)} placeholder="Key ..."/>
        <button type="submit">Shorten</button>
      </form>
    <style jsx>{`
      .container {
        min-height: 100vh;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      main {
        padding: 5rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      footer {
        width: 100%;
        height: 100px;
        border-top: 1px solid #eaeaea;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      footer img {
        margin-left: 0.5rem;
      }

      footer a {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      .title a {
        color: #0070f3;
        text-decoration: none;
      }

      .title a:hover,
      .title a:focus,
      .title a:active {
        text-decoration: underline;
      }

      .title {
        margin: 0;
        line-height: 1.15;
        font-size: 4rem;
      }

      .title,
      .description {
        text-align: center;
      }

      .description {
        line-height: 1.5;
        font-size: 1.5rem;
      }

      code {
        background: #fafafa;
        border-radius: 5px;
        padding: 0.75rem;
        font-size: 1.1rem;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
          DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
      }

      .grid {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;

        max-width: 800px;
        margin-top: 3rem;
      }

      .card {
        margin: 1rem;
        flex-basis: 45%;
        padding: 1.5rem;
        text-align: left;
        color: inherit;
        text-decoration: none;
        border: 1px solid #eaeaea;
        border-radius: 10px;
        transition: color 0.15s ease, border-color 0.15s ease;
      }

      .card:hover,
      .card:focus,
      .card:active {
        color: #0070f3;
        border-color: #0070f3;
      }

      .card h3 {
        margin: 0 0 1rem 0;
        font-size: 1.5rem;
      }

      .card p {
        margin: 0;
        font-size: 1.25rem;
        line-height: 1.5;
      }

      @media (max-width: 600px) {
        .grid {
          width: 100%;
          flex-direction: column;
        }
      }
    `}</style>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
)
    }
export default Home
