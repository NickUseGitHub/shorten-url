import React, { useState } from 'react'

export default function App() {
  const [urlForShorten, setUrlForShorten] = useState('')

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
      <div className="output"></div>
      <form onSubmit={handleOnSubmit}>
        <input type="text" value={urlForShorten} onChange={handleOnChange} />
      </form>
    </div>
  )
}
