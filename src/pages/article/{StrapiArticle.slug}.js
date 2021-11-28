import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../../components/layout"
import dayjs from "dayjs"

import Markdown from "react-markdown"

export const query = graphql`
  query ArticleQuery($slug: String!) {
    strapiArticle(slug: { eq: $slug }) {
      strapiId
      title
      description
      content
      published_at
      category {
        name
      }
      image {
        localFile {
          publicURL
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: TRACED_SVG)
          }
        }
      }
      author {
        name
        picture {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 30)
            }
          }
        }
      }
    }
  }
`

const Article = ({ location, data }) => {
  const pageContext = location?.state?.pageContext
  console.log(location)
  const article = data.strapiArticle
  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true,
  }

  return (
    <Layout seo={seo} pageContext={{ ...pageContext }}>
      <div className="blog ">
        <div className="head-article grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2  gap-2 py-10">
          <div>
            <p className="ml-4 text-lg uppercase">
              {article?.category?.name} {" - "}
              {dayjs(article?.published_at).format("MMMM DD, YYYY")}
            </p>
            <h1
              className="title pl-5"
              style={{ textAlign: "left", maxWidth: "100%" }}
            >
              {article.title}
            </h1>
          </div>
          <div //style={{width: '100%', height: '0px', paddingTop: '115%', position: 'relative'}}
          >
            <GatsbyImage
              alt={`Picture for ${article.title} article`}
              image={article.image.localFile.childImageSharp?.gatsbyImageData}
              // style={{width: '100%', height:'100%',top:'0px', left:'0px', position:'absolute', objectFit:'cover', objectPosition:'center center', verticalAlign: 'middle'}}
            />
          </div>
        </div>
        <div className="uk-section container py-8">
          <div className="uk-container uk-container-small px-10 mb-6">
            <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
              <div>
                {article.author.picture && (
                  <GatsbyImage
                    image={
                      article.author.picture.localFile.childImageSharp
                        ?.gatsbyImageData
                    }
                    alt={`Picture of ${article.author.name}`}
                    style={{ borderRadius: "50%" }}
                  />
                )}
              </div>
              <div className="uk-width-expand">
                <p className="uk-margin-remove-bottom text-lg font-semibold">
                  By{" "}
                  <span className="text-green-700">
                    {article?.author?.name}
                  </span>
                </p>
              </div>
            </div>
            <Markdown
              className="text-xl font-semibold leading-10"
              source={article.content}
              escapeHtml={false}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Article
