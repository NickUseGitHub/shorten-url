import React, { useState } from 'react'
import styled from 'styled-components'

import UrlResult from './UrlResult'
import BoxInput from './BoxInput'

function App({ className }) {
  const [urlResult, setUrlResult] = useState('')

  return (
    <div className={className}>
      <UrlResult urlResult={urlResult} />
      <BoxInput setUrlResult={setUrlResult} />
    </div>
  )
}

export default styled(App)`
  background-color: #a9c8e7;
  width: 100%;
  height: 90vh;
  border-radius: 7%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
