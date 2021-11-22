import React, { useState, useEffect } from "react"
import {
  Box,
  Tag,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  Flex,
  Text,
} from "@chakra-ui/react"
import parse from "html-react-parser"
import Layout from "@/components/layout"
import SneakerApi from "../api"
import _ from "lodash"
import ThreeSixty from "react-360-view"
import CustomLink from "../components/elements/custom-link"
import ListSizes from "../components/elements/listSizes"
import dayjs from "dayjs"

const ProductPage = ({ pageContext }) => {
  const product = pageContext?.prod
  const [images360, setImages360] = useState()
  const listSizes = pageContext?.sizes
  const getListSizes = () => {
    product.size_item = []
    product?._sneaker_item_of_sneaker_ref?.map(item => {
      const sizeItem = listSizes?.find(size => size.id === item?.size_id)
      product?.size_item?.push(sizeItem.us)
    })
    console.log(product)
  }
  const getImage360 = async id => {
    const imageList = await SneakerApi.getImage360(id)
    setImages360(imageList)
    console.log(imageList)
  }
  const newlineText = desc => {
    const text = desc
    return text.split("\n").map(str => <p>{str}</p>)
  }

  useEffect(() => {
    getListSizes()
    getImage360(product.id)
  }, [])
  return (
    <Layout pageContext={{ ...pageContext }}>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"
        rel="stylesheet"
        type="text/css"
      />

      <section className="container align-middle text-center pt-12 pb-16">
        <Box className="grid grid-cols-2 gap-4 sm-grid-cols-1">
          <Box textAlign="left">
            <h1 style={{ fontSize: "22px", fontWeight: "700" }}>
              {product.nick_name}
            </h1>
            <h2
              style={{
                color: "#5f5f5f",
                fontSize: "20px",
                fontWeight: "500",
                marginBottom: "15px",
              }}
            >
              {product.full_name}
            </h2>
            <Tag variant="solid" colorScheme="teal">
              {product?.colorway}
            </Tag>
            {images360 && images360?.length && (
              <ThreeSixty
                amount={36}
                imagePath="https://scaleflex.cloudimg.io/width/600/q35/https://scaleflex.ultrafast.io/https://scaleflex.airstore.io/demo/chair-360-36"
                fileName="chair_{index}.jpg?v1"
                spinReverse="true"
              />
            )}
            {!images360?.length && <img src={product?.miniature?.url} />}
          </Box>
          <Box className="sm-reverse-grid">
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="0.25rem"
              overflow="hidden"
              borderColor="#cfcfcf"
              padding="15px"
            >
              <Accordion
                allowMultiple
                borderWidth="1px"
                borderRadius="0.25rem"
                borderColor="#cfcfcf"
              >
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Size :
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <ListSizes sizes={product?.size_item} />
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              <Flex justifyContent="space-between" mt="20px" mb="20px">
                <CustomLink
                  style={{
                    backgroundColor: "#006340",
                    color: "white",
                    padding: "5px 50px",
                    borderRadius: "0.25rem",
                    fontWeight: "bold",
                    lineHeight: "1.3",
                  }}
                  link={{ url: "#", newTab: true, id: "link1" }}
                >
                  <p style={{ fontSize: "20px" }}>Buy </p>{" "}
                  <p style={{ fontSize: "12px" }}>or Bid</p>
                </CustomLink>
                <Box>
                  Lowest Ask
                  <Box>$328</Box>
                </Box>
              </Flex>
              <Divider />
              <Flex justifyContent="space-between" mt="20px">
                <CustomLink
                  style={{
                    backgroundColor: "#db2d16",
                    color: "white",
                    padding: "5px 50px",
                    borderRadius: "0.25rem",
                    fontWeight: "bold",
                    lineHeight: "1.3",
                  }}
                  link={{ url: "#", newTab: true, id: "link2" }}
                >
                  <p style={{ fontSize: "20px" }}>Sell </p>{" "}
                  <p style={{ fontSize: "12px" }}>or Ask</p>
                </CustomLink>
                <Box>
                  Highest Bid
                  <Box>$283</Box>
                </Box>
              </Flex>
            </Box>
            <Box textAlign="left">Last Sale: $306</Box>
          </Box>
        </Box>
        <Box mt="20px">
          <Divider />
          <h3
            style={{
              backgroundColor: "black",
              color: "white",
              fontWeight: "bold",
              padding: "10px",
              fontSize: "20px",
              maxWidth: "180px",
            }}
          >
            Product Details
          </h3>
          <Box className="grid grid-cols-2 gap-12 sm-grid-cols-1">
            <Box mt="5px">
              {product?.colorway && (
                <Flex justifyContent="space-between" mt="5px">
                  <p>Colorway</p>
                  <p style={{ fontWeight: 700 }}>{product?.colorway}</p>
                </Flex>
              )}
              {product?.retail_price && (
                <Flex justifyContent="space-between" mt="10px">
                  <p>Retail Price</p>
                  <p style={{ fontWeight: 700 }}>$ {product?.retail_price}</p>
                </Flex>
              )}
              {product?.release_date && (
                <Flex justifyContent="space-between" mt="10px">
                  <p>Release Date</p>
                  <p style={{ fontWeight: 700 }}>
                    {dayjs
                      .unix(product?.release_date / 1000)
                      .format("MM/DD/YYYY")}
                  </p>
                </Flex>
              )}
            </Box>
            {product?.desciption && product?.desciption !== "N/A" && (
              <Box mt="5px" textAlign="left">
                <p style={{ fontWeight: 700, marginBottom: "10px" }}>
                  Product Description
                </p>
                <Text>{newlineText(product?.desciption)}</Text>
              </Box>
            )}
          </Box>
        </Box>
      </section>
    </Layout>
  )
}
export default ProductPage
