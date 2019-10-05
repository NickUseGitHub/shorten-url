import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

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

function BoxInput({ className, setUrlResult }) {
  const [urlForShorten, setUrlForShorten] = useState('')

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
    <form className={className} onSubmit={handleOnSubmit}>
      <input type="text" value={urlForShorten} onChange={handleOnChange} />
    </form>
  )
}

export default styled(BoxInput)``
