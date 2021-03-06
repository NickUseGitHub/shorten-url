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
  const isDisableSubmit = !!urlForShorten === false

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
      <span>Insert your url here</span>{' '}
      <input
        type="text"
        value={urlForShorten}
        placeholder="e.g. www.yourwebsite.com"
        onChange={handleOnChange}
      />
      <button type="submit" disabled={isDisableSubmit}>
        Ok
      </button>
    </form>
  )
}

export default styled(BoxInput)`
  width: 90%;
  font-size: 1.5em;

  button {
    height: 50px;
    padding: 5px 10px;
    font-size: 0.7em;
    margin-left: 10px;
    border: 2px solid transparent;
  }

  input {
    height: 50px;
    width: 60%;

    border: radius: 5%;
    border: 2px solid black;
  }
`
