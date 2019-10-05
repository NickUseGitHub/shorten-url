import React, { useState } from 'react'
import UrlResult from './UrlResult'

export default function App() {
  const [urlForShorten, setUrlForShorten] = useState('')
  const [urlResult, setUrlResult] = useState('')

  function handleOnChange(event) {
    event.preventDefault()

    setUrlForShorten(event.target.value)
  }

  function handleOnSubmit(event) {
    event.preventDefault()

    alert(urlForShorten)
    setUrlForShorten('')
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
