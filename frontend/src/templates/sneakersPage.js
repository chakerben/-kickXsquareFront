import React, { useState, useEffect } from "react"
import Card from "../components/elements/product/card"
import ListSizes from "../components/elements/listSizes"
import ListPrices from "../components/elements/listPrices"
import { Box, Button } from "@chakra-ui/react"
import Layout from "@/components/layout"
import InfiniteScroll from "react-infinite-scroll-component"
import SneakerApi from "../api/"
import _ from "lodash"

const SneakersPage = ({ pageContext, sneakers, sizes }) => {
  const items = sneakers ? sneakers : pageContext?.sneakers
  const listSizes = sizes ? sizes : pageContext?.sizes
  const [filtredItems, setFiltredItems] = useState(items)
  const totalItems = items?.length
  const [filtreSize, SetFiltreSize] = useState()
  const [filtrePrice, setFiltrePrice] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const maxItems = 50
  const [lastItemIndex, setLastItemIndex] = useState(50)
  const [scrolledItems, setScrolledItems] = useState(
    filtredItems?.slice(0, maxItems)
  )
  const getListSizes = () => {
    items &&
      items?.map((product, i) => {
        product.size_item = []
        product?._sneaker_item_of_sneaker_ref?.map(async item => {
          const size = await SneakerApi.getSize(item?.size_id)
          product?.size_item?.push(size.us)
        })
      })
  }
  useEffect(() => {
    getListSizes()
  }, [])
  useEffect(
    () => {
      filtreAll()
    },
    [filtrePrice],
    [filtreSize]
  )
  const fetchMoreData = lastIndex => {
    setLastItemIndex(lastIndex + maxItems)
    if (lastIndex >= totalItems) {
      setHasMore(false)
      return
    }
    const newList = filtredItems.slice(lastIndex, lastIndex + maxItems)
    setScrolledItems([...scrolledItems, ...newList])
  }
  const refresh = (filtredList = items) => {
    setLastItemIndex(0)
    const newList = filtredList?.slice(0, maxItems)
    setScrolledItems(newList)
  }

  const updateFiltres = (type, filtre, checked = null) => {
    type === "size" && SetFiltreSize(filtre)
    if (type === "price") {
      if (checked === true) {
        setFiltrePrice(filtrePrice?.concat(filtre))
      } else {
        removeFiltres(filtre)
      }
    }
    filtreAll(type, filtre)
  }
  const filtreByPrice = (list = items, listP = filtrePrice) => {
    return _.filter(list, function (item) {
      let newList = listP?.find(price => {
        if (price.min <= item.retail_price && price.max >= item.retail_price)
          return price
      })
      return !_.isNil(newList)
    })
  }
  const filtreBySize = (filtre, list = items) => {
    return _.filter(list, function (item) {
      return _.includes(item.size_item, filtre)
    })
  }
  const filtreAll = (type = null, filtre = null) => {
    let filtredList
    if (type === "size") {
      filtredList = filtreBySize(filtre)
      if (filtrePrice.length) {
        filtredList = filtreByPrice(filtredList)
      }
      setFiltredItems(filtredList)
      refresh(filtredList)
    }
    if (type === "price") {
      const listPrice = filtrePrice?.concat(filtre)
      filtredList = filtreByPrice(items, listPrice)
      if (filtreSize) {
        filtredList = filtreBySize(filtreSize, filtredList)
      }
      setFiltredItems(filtredList)
      refresh(filtredList)
    }
    if (type === "removeSize") {
      if (filtrePrice.length) {
        filtredList = filtreByPrice(filtredItems)
        setFiltredItems(filtredList)
        refresh(filtredList)
      } else {
        setFiltredItems(items)
        refresh()
      }
    }
    if (type === "removePrice") {
      if (filtreSize) {
        filtredList = filtreBySize(filtreSize, filtredList)
        if (filtre?.length > 0) {
          filtredList = filtreByPrice(filtredList, filtre)
        }
        setFiltredItems(filtredList)
        refresh(filtredList)
      } else {
        if (filtre?.length > 0) {
          filtredList = filtreByPrice(filtredItems, filtre)
          setFiltredItems(filtredList)
          refresh(filtredList)
        } else {
          setFiltredItems(items)
          refresh()
        }
      }
    }
    if (_.isNil(type)) {
      if (filtreSize) {
        filtredList = filtreBySize(filtreSize, filtredItems)
        if (filtrePrice.length) {
          filtredList = filtreByPrice(filtredList)
        }
        setFiltredItems(filtredList)
        refresh(filtredList)
      } else if (filtrePrice.length) {
        filtredList = filtreByPrice(filtredList)
        setFiltredItems(filtredList)
        refresh(filtredList)
      } else {
        refresh()
      }
    }
  }

  const removeFiltres = filtre => {
    if (filtre === "all") {
      setFiltrePrice([])
      SetFiltreSize()
      setFiltredItems(items)
      filtreAll()
    } else if (filtre === "size") {
      SetFiltreSize()
      filtreAll("removeSize")
    } else {
      const newPrices = _.filter(filtrePrice, function (item) {
        return item.id !== filtre.id
      })
      setFiltrePrice(newPrices)
      filtreAll("removePrice", newPrices)
    }
  }
  return (
    <div className="max-w-sm mx-auto flex p-6 container sm-grid sm-grid-cols-1">
      <div className="flex-shrink-0">
        <ListSizes title="Size" filtre={updateFiltres} sizes={listSizes} />
        <ListPrices filtre={updateFiltres} />
      </div>
      <div className="ml-6 pt-1">
        <Box className="grid grid-cols-4 gap-4">
          {(filtreSize || filtrePrice.length > 0) && (
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={() => removeFiltres("all")}
            >
              Clear all filters x
            </Button>
          )}
          {filtreSize && (
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={() => removeFiltres("size")}
            >
              {filtreSize} x
            </Button>
          )}
          {filtrePrice?.map((filtre, i) => {
            return (
              <Button
                colorScheme="teal"
                key={`filtres-${i}`}
                variant="solid"
                onClick={() => removeFiltres(filtre)}
              >
                {filtre.name} x
              </Button>
            )
          })}
        </Box>
        {sneakers && (
          <section className=" align-middle text-center pt-12 pb-16">
            <InfiniteScroll
              dataLength={scrolledItems?.length}
              next={() => fetchMoreData(lastItemIndex)}
              hasMore={hasMore}
              refreshFunction={refresh}
              pullDownToRefresh
              pullDownToRefreshThreshold={50}
            >
              <Box className="grid grid-cols-4 gap-4 sm-grid-cols-2">
                {scrolledItems?.map((product, i) => (
                  <Card product={product} key={`product-${i}`} />
                ))}
              </Box>
            </InfiniteScroll>
          </section>
        )}
        {_.isNil(sneakers) && (
          <Layout pageContext={{ ...pageContext }}>
            <section className="container align-middle text-center pt-12 pb-16">
              <InfiniteScroll
                dataLength={scrolledItems?.length}
                next={() => fetchMoreData(lastItemIndex)}
                hasMore={hasMore}
                refreshFunction={refresh}
                pullDownToRefresh
                pullDownToRefreshThreshold={50}
              >
                <Box className="grid grid-cols-4 gap-4 sm-grid-cols-2">
                  {scrolledItems?.map((product, i) => (
                    <Card product={product} key={`product-${i}`} />
                  ))}
                </Box>
              </InfiniteScroll>
            </section>
          </Layout>
        )}
      </div>
    </div>
  )
}
export default SneakersPage
