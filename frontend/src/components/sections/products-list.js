import React from "react"
import BrandCard from "../elements/product/brandCard"
import Card from "../elements/product/card"
import { Flex, Box } from "@chakra-ui/react"
import { Link } from "gatsby"

const POPULAR_BRAND = "PopularBrands"
const RECOMMENDED_BY_US = "MostPopularSneakers"
const MOST_POPULAR_SNEAKERS = "RecentlyViewed"

const ProductsList = ({ data, products }) => {
  const link =
    data?.type === POPULAR_BRAND
      ? "/sneakers"
      : data?.type === MOST_POPULAR_SNEAKERS
      ? "/sneakers/most-popular"
      : "/sneakers/recommended"
  console.log(products)
  return (
    <section className="container align-middle text-center pt-12 pb-16">
      <Flex justifyContent="space-between">
        <h2 className="section-title mb-6">{data?.title}</h2>
        <Link to={link} className="uk-link-reset">
          {data?.labelLink}{" "}
          <svg
            viewBox="0 0 448 512"
            focusable="false"
            className="chakra-icon css-onkibi"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
            ></path>
          </svg>
        </Link>
      </Flex>
      {/* product list */}
      {data?.type === POPULAR_BRAND && (
        <Box className="grid grid-cols-5 gap-4">
          {products?.brand
            ?.slice(0, data?.numberOfProducts)
            .map((product, i) => (
              <BrandCard brand={product} key={`brand-${i}`} />
            ))}
        </Box>
      )}
      {data?.type === RECOMMENDED_BY_US && (
        <Box className="grid grid-cols-6 gap-4">
          {products?.recomended
            ?.slice(0, data?.numberOfProducts)
            .map((product, i) => (
              <Card product={product} key={`recomended-${i}`} />
            ))}
        </Box>
      )}
      {data?.type === MOST_POPULAR_SNEAKERS && (
        <Box className="grid grid-cols-6 gap-4">
          {products?.popular
            ?.slice(0, data?.numberOfProducts)
            .map((product, i) => (
              <Card product={product} key={`popular-${i}`} />
            ))}
        </Box>
      )}
    </section>
  )
}

export default ProductsList
