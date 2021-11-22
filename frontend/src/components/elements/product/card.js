import React from "react"
import { Link } from "gatsby"
import { Box } from "@chakra-ui/layout"

const Card = ({ product }) => {
  const image = product?._sneaker_ref?.miniature?.url
    ? product?._sneaker_ref?.miniature?.url
    : product?.miniature?.url
  const name = product?._sneaker_ref?.full_name
    ? product?._sneaker_ref?.full_name
    : product?.full_name
  const ask = product?._sneaker_ref?.ask
    ? product?._sneaker_ref?.ask
    : product?.ask
  const price = product?._sneaker_ref?.retail_price
    ? product?._sneaker_ref?.retail_price
    : product?.retail_price
  const solde = product?._sneaker_ref?.solde
    ? product?._sneaker_ref?.solde
    : product?.solde
  return (
    <Box className="product_card">
      <Link to={`/sneakers/${product?.slug}`} className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className="uk-card-media-top">
            <div className="uk-card-media-top-img">
              {/* <StaticImage
              src={product?.node?.image?.localFile?.childImageSharp?.gatsbyImageData}
              alt={`Hero image`}
              />*/}
              {image ? (
                <img
                  width={140}
                  height={75}
                  src={image}
                  placeholder="blurred"
                />
              ) : (
                <img
                  width={140}
                  height={75}
                  src="/default-image.png"
                  placeholder="blurred"
                />
              )}
            </div>
          </div>
          <div className="uk-card-body">
            <p className="uk-text-large">{name}</p>
            <div className="price-line-div">
              <p className="chakra-text css-1joryfz ask">
                {" "}
                {ask ? ask : "lowest ask"}
              </p>
              <p className="chakra-text css-1kph905 price">${price}</p>
            </div>
            <p className="sold css-1eaqka8">{solde ? solde : "114 sold"}</p>
          </div>
        </div>
      </Link>
    </Box>
  )
}

export default Card
