import React from "react"
import { Box, Checkbox } from "@chakra-ui/react"
import _ from "lodash"

const ListPrices = ({ filtre }) => {
  const list = [
    {
      id: 0,
      name: "Under $100",
      min: 0,
      max: 100,
    },
    {
      id: 1,
      name: "$100 - $200",
      min: 100,
      max: 200,
    },
    {
      id: 2,
      name: "$200 - $300",
      min: 200,
      max: 300,
    },
    {
      id: 3,
      name: "$300 - $400",
      min: 300,
      max: 400,
    },
    {
      id: 4,
      name: "$400 - $500",
      min: 400,
      max: 500,
    },
    {
      id: 5,
      name: "$500 - $600",
      min: 500,
      max: 600,
    },
    {
      id: 6,
      name: "$600 +",
      min: 600,
      max: 100000,
    },
  ]
  return (
    <Box>
      <h2>PRICES</h2>
      <Box className="grid grid-cols-1 gap-4">
        {list?.map((price, index) => {
          return (
            <Checkbox
              iconColor="black"
              iconSize="1rem"
              colorScheme="black"
              key={`check-${index}`}
              onChange={e => filtre("price", price, e.target.checked)}
            >
              {price.name}
            </Checkbox>
          )
        })}
      </Box>
    </Box>
  )
}
export default ListPrices
