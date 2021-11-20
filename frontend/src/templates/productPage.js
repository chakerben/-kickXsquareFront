import React, { useState } from "react"
import { Box, Flex } from "@chakra-ui/react"
import Layout from "@/components/layout"
import SneakerApi from "../api"

const ProductPage = ({ pageContext }) => {
  const product = pageContext?.prod
  console.log(product)
  const image360 = SneakerApi.getImage360(product.id)
  const size = SneakerApi.getSize(product.id)

  console.log(image360)
  console.log(size)
  return (
    <Layout pageContext={{ ...pageContext }}>
      <section className="container align-middle text-center pt-12 pb-16">
        <h1>teteee</h1>
        <Flex></Flex>
      </section>
    </Layout>
  )
}
export default ProductPage
