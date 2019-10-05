import React, { useState } from 'react'
import axios from 'axios'
import UrlResult from './UrlResult'

async function getShortentUrl(url) {
  try {
    const { data } = await axios.get('/shorturl', {
      params: {
        url,
      },
    })

    return data.data.shortUrl
  } catch (error) {
    console.error('error', error.message)
  }
}

export default function App() {
  const [urlForShorten, setUrlForShorten] = useState('')
  const [urlResult, setUrlResult] = useState('')

  function handleOnChange(event) {
    event.preventDefault()

    setUrlForShorten(event.target.value)
  }

  async function handleOnSubmit(event) {
    event.preventDefault()
    if (!urlForShorten) {
      alert('please insert url')
      return
    }

    const shortUrl = await getShortentUrl(urlForShorten)

    if (!shortUrl) return

    setUrlForShorten('')
    setUrlResult(shortUrl)
  }

  return (
    <div>
      <UrlResult urlResult={urlResult} />
      <form onSubmit={handleOnSubmit}>
        <input type="text" value={urlForShorten} onChange={handleOnChange} />
      </form>
    </div>
  )
}
