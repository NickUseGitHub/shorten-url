import React from 'react'

export default function UrlResult({ urlResult }) {
  if (!urlResult) return null

  return [
    <div key="output" className="output">
      {urlResult}
    </div>,
    <br key="space" />,
  ]
}
