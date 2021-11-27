import React from "react"
import { Link } from "gatsby"
import { Box } from "@chakra-ui/layout"

const BrandCard = ({ brand }) => {
  console.log(brand?.logo?.url)
  return (
    <Box className="brand_card">
      <Link to={`/${brand?.slug}`} className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className="uk-card-media-top">
            <img
              src={brand?.logo?.url}
              placeholder="blurred"
              layout="fixed"
              width={240}
              height={165}
            />
          </div>
        </div>
      </Link>
    </Box>
  )
}

export default BrandCard
