import React from "react"
import { Button, Box } from "@chakra-ui/react"
import _ from "lodash"

const ListSizes = ({ title, sizes, filtre }) => {
  return (
    <Box>
      <h2>{title}</h2>
      <Box className="grid grid-cols-4 gap-4">
        {sizes?.length > 0 &&
          sizes?.map((size, index) => {
            return (
              <Button
                className="bg-transparent hover:bg-black text-black-700 font-semibold hover:text-white py-1 px-2 border border-black hover:border-transparent"
                key={`size-${index}`}
                onClick={() => !_.isNil(filtre) && filtre("size", size.us)}
              >
                <dl>
                  <dt>{size.us > 0 ? size.us : size}</dt>
                  {size.price > 0 && (
                    <dd style={{ color: "#006340" }}>${size.price}</dd>
                  )}
                </dl>
              </Button>
            )
          })}
      </Box>
    </Box>
  )
}
export default ListSizes
