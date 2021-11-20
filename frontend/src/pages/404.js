import React from "react"

import Layout from "../components/layout"
import { graphql } from "gatsby"

const NotFoundPage = ({ data }) => {
  const {
    strapiGlobal,
    site: {
      siteMetadata: {
        languages: { locales, defaultLocale },
      },
    },
  } = data

  return (
      <Layout
        pageContext={{
          locale: defaultLocale,
          locales,
          defaultLocale,
          slug: "404",
        }}
        seo={{ title: "404: Not found" }}
        global={strapiGlobal}
      >
        <h1>404: Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Layout>
  )
}

export default NotFoundPage

export const query = graphql`
  query NotFoundQuery {
    site {
      siteMetadata {
        languages {
          locales
          defaultLocale
        }
      }
    }
    strapiGlobal {
      ...GlobalData
    }
  }
`
