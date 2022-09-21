import React from 'react'

const CardFormContainer = ({children, background}) => {
  const container = {
    width: "400px",
    padding: "15px",
    height: "auto",
    marginLeft: "15px",
    marginRight: "15px",
    background: background,
    color: "black",
    borderRadius: "14px",
  }
  return (
    <div style={container}>{children}</div>
  )
}

export default CardFormContainer