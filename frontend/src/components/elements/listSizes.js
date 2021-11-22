import React from "react"
import { Button, Box } from "@chakra-ui/react"
import _ from "lodash"

const ListSizes = ({ title, sizes, filtre }) => {
  return (
    <Box>
      <h2>{title}</h2>
      <Box className="grid grid-cols-4 gap-4">
        {sizes?.length &&
          sizes?.map((size, index) => {
            return (
              <Button
                className="bg-transparent hover:bg-black text-black-700 font-semibold hover:text-white py-1 px-2 border border-black hover:border-transparent"
                key={`size-${index}`}
                onClick={() => filtre("size", size.us)}
              >
                {size.us ? size.us : size}
              </Button>
            )
          })}
      </Box>
    </Box>
  )
}
export default ListSizes
