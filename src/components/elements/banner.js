import Navbar from "./navbar"
import Search from "./search/Search"
import React from "react"
import { Box } from "@chakra-ui/react"

const Banner = ({ banner, navbar, pageContext }) => {
  const url = `url(${banner?.Image?.localFile?.publicURL})`
  return (
    <Box backgroundImage={url} className="banner">
      <Navbar navbar={navbar} pageContext={pageContext} />
      <h1>{banner?.Title}</h1>
      <h2>{banner?.Subtitle}</h2>
      <Search details={pageContext?.listSneakers} />
    </Box>
  )
}

export default Banner
