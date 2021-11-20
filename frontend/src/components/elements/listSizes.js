import React, { useState, useEffect } from "react"
import { Button, Box } from "@chakra-ui/react"
import SneakerApi from "../../api"
import _ from "lodash"

const ListSizes = ({ filtre }) => {
  const [sizes, setSizes] = useState()

  const getSizes = async () => {
    let list = await SneakerApi.getListSize()
    list.sort(function (a, b) {
      return a.us - b.us
    })
    setSizes(list)
  }
  useEffect(async () => {
    if (_.isNil(sizes)) {
      await getSizes()
    }
  }, [sizes])
  return (
    <Box>
      <h2>SIZES</h2>
      <Box className="grid grid-cols-4 gap-4">
        {sizes?.length &&
          sizes?.map((size, index) => {
            return (
              <Button
                className="bg-transparent hover:bg-black text-black-700 font-semibold hover:text-white py-1 px-2 border border-black hover:border-transparent"
                key={`size-${index}`}
                onClick={() => filtre("size", size.us)}
              >
                {size.us}
              </Button>
            )
          })}
      </Box>
    </Box>
  )
}
export default ListSizes
