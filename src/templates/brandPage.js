import React from "react"
import Card from "../components/elements/product/card"
import { Box } from "@chakra-ui/react"
import Layout from "@/components/layout"

const BrandPage = ({ pageContext }) => {
  const list = pageContext?.prod?.list
  console.log(pageContext)
  console.log(list)
  return (
    <Layout pageContext={{ ...pageContext }}>
      <Box>
        <h1>teteee</h1>
        <Box className="grid grid-cols-4 gap-4">
          {list?.map((product, i) => (
            <Card product={product} key={`product-${i}`} />
          ))}
        </Box>
      </Box>
    </Layout>
  )
}
export default BrandPage
