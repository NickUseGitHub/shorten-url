import React from 'react'
import styled from 'styled-components'

function UrlResult({ className, urlResult }) {
  if (!urlResult) return null

  return (
    <div className={className}>
      your shorten url:{' '}
      <a href={urlResult} rel="noopener noreferrer" target="_blank">
        {urlResult}
      </a>
    </div>
  )
}

export default styled(UrlResult)`
  width: 90%;
  height: 100px;
  background-color: #e9e7a5;
  margin-bottom: 20px;
  font-size: 2em;
  border-radius: 35px;

  display: flex;
  justify-content: center;
  align-items: center;
`
