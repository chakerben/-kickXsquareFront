import React from "react"
import Card from "../card"
import { Link } from "gatsby"
import { Flex, Box } from "@chakra-ui/react"

const LatestBlog = ({ data, articles }) => {
  return (
    <section className="container align-middle text-center pt-12 pb-16">
      <Flex justifyContent="space-between">
        <h2 className="section-title mb-6">{data.title}</h2>
        <Link to="/news" className="uk-link-reset">
          {data?.linkLabel}{" "}
          <svg
            viewBox="0 0 448 512"
            focusable="false"
            className="chakra-icon css-onkibi"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
            ></path>
          </svg>
        </Link>
      </Flex>
      {/* article list */}
      <Box className="grid grid-cols-4 gap-4 sm-grid-cols-2">
        {articles?.slice(0, data.numberOfArticles).map((article, i) => (
          <Card article={article} key={`article-${i}`} />
        ))}
      </Box>
    </section>
  )
}

export default LatestBlog
