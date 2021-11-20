import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Box } from "@chakra-ui/layout"
import dayjs from "dayjs"
const Card = ({ article }) => {
  return (
    <Box className="article_card">
      <Link to={`/article/${article?.node?.slug}`} className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className="uk-card-media-top">
            <GatsbyImage
              image={
                article?.node?.image?.localFile?.childImageSharp
                  ?.gatsbyImageData
              }
              alt={`Hero image`}
            />
          </div>
          <div className="uk-card-body">
            <p className="uk-text-large">{article?.node?.title}</p>
            <div>
              <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
                <div className="uk-width-expand">
                  <p className="uk-margin-remove-bottom date">
                    {article?.node?.author?.name} .{" "}
                    {dayjs(article?.node?.published_at).format("MM/DD/YYYY")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Box>
  )
}

export default Card
