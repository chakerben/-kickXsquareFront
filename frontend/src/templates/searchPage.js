import React, { useState } from "react"
import Card from "../components/elements/product/card"
import { Box } from "@chakra-ui/react"
import Layout from "@/components/layout"
import InfiniteScroll from "react-infinite-scroll-component"

const SearchPage = ({ location, pageContext }) => {
  const searchField = location?.state?.searchKey
  const [items, setItems] = useState(location?.state?.filteredProducts)
  const totalItems = items?.length
  const [hasMore, setHasMore] = useState(true)
  const maxItems = 50
  const [lastItemIndex, setLastItemIndex] = useState(50)
  const [newItems, setNewItems] = useState(items?.slice(0, maxItems))
  const fetchMoreData = lastIndex => {
    setLastItemIndex(lastIndex + maxItems)
    if (lastIndex >= totalItems) {
      setHasMore(false)
      return
    }
    const newList = items.slice(lastIndex, lastIndex + maxItems)
    setNewItems([...newItems, ...newList])
    console.log(newItems)
  }

  return (
    <Layout pageContext={{ ...pageContext }}>
      <section className="container align-middle text-center pt-12 pb-16">
        <h1>
          Browse {totalItems} results for {searchField}
        </h1>
        <InfiniteScroll
          dataLength={newItems?.length}
          next={() => fetchMoreData(lastItemIndex)}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <Box className="grid grid-cols-4 gap-4">
            {newItems?.map((product, i) => (
              <Card product={product} key={`product-${i}`} />
            ))}
          </Box>
        </InfiniteScroll>
      </section>
    </Layout>
  )
}
export default SearchPage
