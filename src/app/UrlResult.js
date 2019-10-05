import React from 'react'

export default function UrlResult({ urlResult }) {
  if (!urlResult) return null

  return [
    <div key="output" className="output">
      your shorten url: {urlResult}
    </div>,
    <br key="space" />,
  ]
}
