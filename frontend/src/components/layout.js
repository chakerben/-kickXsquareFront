import React from "react"
import NavbarHeader from "./elements/navbar-header"
import Footer from "./elements/footer"
import Banner from "./elements/banner"
//import NotificationBanner from "./elements/notification-banner"
import { graphql, useStaticQuery } from "gatsby"
import Seo from "./seo"
import { ChakraProvider } from "@chakra-ui/react"

const Layout = ({ children, pageContext, seo, blog }) => {
  const data = useStaticQuery(query)

  const { banner, navbar, footer, notificationBanner } = data.strapiGlobal
  //const [bannerIsShown, setBannerIsShown] = useState(true)
  return (
    <ChakraProvider>
      <Seo seo={seo} global={data.strapiGlobal} />
      <div className="flex flex-col justify-between min-h-screen">
        {/* Aligned to the top */}
        <div className="flex-1">
          {/* {notificationBanner && bannerIsShown && (
          <NotificationBanner
            data={notificationBanner}
            closeSelf={() => setBannerIsShown(false)}
          />
        )}*/}
          {pageContext?.slug === "" && (
            <Banner banner={banner} navbar={navbar} pageContext={pageContext} />
          )}
          {pageContext?.slug !== "" && (
            <NavbarHeader navbar={navbar} pageContext={pageContext} />
          )}
          <div>{children}</div>
        </div>
        {/* Aligned to the bottom */}
        <Footer
          footer={footer}
          pageContext={pageContext}
          blog={blog}
          navbar={navbar}
        />
      </div>
    </ChakraProvider>
  )
}
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
  query {
    strapiGlobal {
      ...GlobalData
    }
  }
`

export default Layout
