import React from "react"

const Scroll = (props) => {
  const otherPage = props?.otherPage
  console.log(otherPage)
  return (
    <div
      style={{
        overflowY: "scroll",
        height: "70vh",
        backgroundColor: "white",
        width: otherPage ? "100%" : "640px",
        margin: otherPage ? "unset" : "auto",
      }}
    >
      {props.children}
    </div>
  )
}

export default Scroll
