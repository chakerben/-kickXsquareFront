import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Box } from "@chakra-ui/react"
import dayjs from "dayjs"
const Card = ({ article, pageContext, type = "HomePage" }) => {
  return (
    <>
      {type === "HomePage" && (
        <Box className="article_card blog">
          <Link
            to={`/article/${article?.node?.slug}`}
            className="uk-link-reset"
            state={{
              pageContext: pageContext,
            }}
          >
            <div className="uk-card uk-card-muted">
              <div className="uk-card-media-top">
                <GatsbyImage
                  image={
                    article?.node?.image?.localFile?.childImageSharp
                      ?.gatsbyImageData
                  }
                  alt={article?.node?.title}
                />
              </div>
              <div className="uk-card-body">
                <p className="uk-text-large">{article?.node?.title}</p>
                <div>
                  <div
                    className="uk-grid-small uk-flex-left"
                    data-uk-grid="true"
                  >
                    <div className="uk-width-expand">
                      <p className="uk-margin-remove-bottom date">
                        {article?.node?.author?.name} .{" "}
                        {dayjs(article?.node?.published_at).format(
                          "MM/DD/YYYY"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </Box>
      )}
      {type === "NewsPage" && (
        <Link
          to={`/article/${article?.node?.slug}`}
          className="uk-link-reset"
          state={{
            pageContext: pageContext,
          }}
        >
          <div className="uk-card uk-card-muted">
            <div className="uk-card-media-top">
              <GatsbyImage
                image={
                  article?.node?.image?.localFile?.childImageSharp
                    ?.gatsbyImageData
                }
                alt={article?.node?.title}
              />
            </div>
            <div className="uk-card-body">
              <p className="py-2 text-xl text-gray-400 hover:text-green-800 font-bold">
                {article?.node?.title}
              </p>
            </div>
          </div>
        </Link>
      )}
      {type === "NewsPageHead" && (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2  gap-8 w-4/5 m-auto py-10  z-0">
          <div className="uk-card-media-top z-0">
            <GatsbyImage
              image={
                article?.node?.image?.localFile?.childImageSharp
                  ?.gatsbyImageData
              }
              alt={article?.node?.title}
            />
          </div>
          <div className="uk-card-body z-10">
            <p className="py-2 text-6xl text-gray-800 uppercase z-10">
              {article?.node?.title}
            </p>
            <p className="py-2 text-2xl text-gray-800 mb-8">
              {article?.node?.description?.slice(0, 100)} ...
            </p>
            <div className="lg:-ml-20 xl:-ml-20 z-10">
              <Link
                to={`/article/${article?.node?.slug}`}
                className="uk-link-reset py-4 px-8 text-white bg-gray-900 z-10 hover:bg-green-800"
                state={{
                  pageContext: pageContext,
                }}
              >
                <span className="text-white">
                  Read Now <span className="px-5"> +++++ </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Card
