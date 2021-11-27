import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "@/components/layout"
import Sections from "@/components/sections"
import ArticlesComponent from "../components/articles"
import SneakersPage from "../templates/sneakersPage"

const DynamicPage = ({ data, pageContext }) => {
  const { contentSections, metadata, localizations } = data.strapiPage
  const [blogSlug] = useState(data?.strapiPage?.slug === "news")
  const [sneakersSlug] = useState(data?.strapiPage?.slug === "sneakers")
  const blog = data.allStrapiArticle
  return (
    <Layout
      pageContext={{ ...pageContext, localizations }}
      seo={metadata}
      blog={blog}
    >
      <Sections
        sections={contentSections}
        products={pageContext?.products}
        articles={blog?.edges}
      />
      {blogSlug && <ArticlesComponent articles={blog?.edges} />}
      {sneakersSlug && (
        <SneakersPage
          sneakers={pageContext.listSneakers}
          sizes={pageContext.sizes}
        />
      )}
    </Layout>
  )
}

export default DynamicPage

export const query = graphql`
  fragment GlobalData on StrapiGlobal {
    favicon {
      localFile {
        publicURL
      }
    }
    footer {
      id
      columns {
        id
        links {
          id
          newTab
          text
          url
        }
        title
      }
      id
      logo {
        alternativeText
        localFile {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
      smallText
    }
    id
    metaTitleSuffix
    metadata {
      metaDescription
      metaTitle
      shareImage {
        localFile {
          publicURL
        }
      }
    }
    navbar {
      button {
        id
        newTab
        text
        type
        url
      }
      id
      links {
        url
        text
        newTab
        id
      }
      logo {
        localFile {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
    notificationBanner {
      id
      text
      type
    }
    banner {
      Title
      Subtitle
      Image {
        localFile {
          publicURL
        }
      }
    }
  }
  query DynamicPageQuery($id: String!, $locale: String!) {
    strapiGlobal(locale: { eq: $locale }) {
      ...GlobalData
    }
    strapiPage(id: { eq: $id }) {
      slug
      shortName
      metadata {
        metaTitle
        metaDescription
        shareImage {
          localFile {
            publicURL
          }
        }
      }
      contentSections
    }
    allStrapiArticle {
      edges {
        node {
          strapiId
          slug
          title
          published_at
          category {
            name
          }
          image {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 800, height: 500)
              }
            }
          }
          author {
            name
            picture {
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 30, height: 30)
                }
              }
            }
          }
        }
      }
    }
  }
`
