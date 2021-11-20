import React from "react"
import { Link } from "gatsby"

const Card = ({ product }) => {
  const image = product?._sneaker_ref?.miniature?.url
    ? product?._sneaker_ref?.miniature?.url
    : product?.miniature?.url
  const fullName = product?._sneaker_ref?.full_name
    ? product?._sneaker_ref?.full_name
    : product?.full_name
  const name = product?._sneaker_ref?.full_name
    ? product?._sneaker_ref?.nick_name
    : product?.nick_name
  return (
    <Link to={`/sneakers/${product?.slug}`}>
      <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5">
        {image ? (
          <img
            width={140}
            height={75}
            src={image}
            placeholder="blurred"
            alt={name}
          />
        ) : (
          <img
            width={140}
            height={75}
            src="/static/default-image.png"
            placeholder="blurred"
            alt={name}
          />
        )}
        <div>
          <h3>{name}</h3>
          <h3>{fullName}</h3>
        </div>
      </div>
    </Link>
  )
}

export default Card
