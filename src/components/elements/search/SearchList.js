import React from "react"
import Card from "./Card"
import { Link } from "gatsby"

const SearchList = ({ filteredProducts }) => {
  const filtered = filteredProducts.map(product => (
    <Card key={product.id} product={product} />
  ))
  return <div>{filtered}</div>
}

export default SearchList
