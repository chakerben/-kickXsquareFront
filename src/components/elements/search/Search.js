import React, { useState } from "react"
import Scroll from "./Scroll"
import SearchList from "./SearchList"
import { Link } from "gatsby"
import { Divider } from "@chakra-ui/react"
function Search({ details, otherPage }) {
  const [searchField, setSearchField] = useState("")
  const [searchShow, setSearchShow] = useState(false)

  const filteredProducts = details?.filter((product) => {
    return (
      product?.nick_name?.toLowerCase()?.includes(searchField.toLowerCase()) ||
      product?.full_name?.toLowerCase()?.includes(searchField.toLowerCase()) ||
      product?.desciption?.toLowerCase()?.includes(searchField.toLowerCase())
    )
  })

  const handleChange = (e) => {
    setSearchField(e.target.value)
    if (e.target.value === "") {
      setSearchShow(false)
    } else {
      setSearchShow(true)
    }
  }

  const searchList = () => {
    if (searchShow) {
      return (
        <Scroll otherPage={otherPage}>
          <Link
            to={"/search"}
            state={{
              searchKey: searchField,
              filteredProducts: filteredProducts,
            }}
          >
            <Divider colorScheme="grey" />
            <h3 className="px-4 py-2 text-xl">
              <strong>{filteredProducts.length}</strong> results found in
              sneakers
            </h3>
          </Link>
          <Divider colorScheme="grey" />
          <SearchList filteredProducts={filteredProducts} />
        </Scroll>
      )
    }
  }

  return (
    <section className="garamond">
      <div className="pa2">
        <input
          className="searchbox input-text form-control"
          type="search"
          placeholder="Search..."
          onChange={handleChange}
        />
        <svg
          viewBox="0 0 512 512"
          focusable="false"
          className="chakra-icon css-17jqirj"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
          ></path>
        </svg>
      </div>
      {searchList()}
    </section>
  )
}

export default Search
