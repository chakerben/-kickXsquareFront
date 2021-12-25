import React, { useEffect } from "react"
import Hero from "@/components/sections/hero"
import LargeVideo from "@/components/sections/large-video"
import FeatureColumnsGroup from "@/components/sections/feature-columns-group"
import FeatureRowsGroup from "@/components/sections/feature-rows-group"
import BottomActions from "@/components/sections/bottom-actions"
import TestimonialsGroup from "@/components/sections/testimonials-group"
import RichText from "./sections/rich-text"
import HeaderPage from "./sections/headerPage"
import Pricing from "./sections/pricing"
import LeadForm from "./sections/lead-form"
import ProductsList from "./sections/products-list"
import LatestBlog from "./sections/latest-blog"
import Feature2 from "./sections/feature2"
import { useCookies } from "react-cookie"
import { navigate } from "gatsby-link"
import { useLocation } from "@reach/router"

// Map Strapi sections to section components
const sectionComponents = {
  "sections.hero": Hero,
  "sections.large-video": LargeVideo,
  "sections.feature-columns-group": FeatureColumnsGroup,
  "sections.feature-rows-group": FeatureRowsGroup,
  "sections.bottom-actions": BottomActions,
  "sections.testimonials-group": TestimonialsGroup,
  "sections.rich-text": RichText,
  "sections.pricing": Pricing,
  "sections.lead-form": LeadForm,
  "sections.products-list": ProductsList,
  "sections.latest-blog": LatestBlog,
  "sections.feature2": Feature2,
  "sections.header-page": HeaderPage,
}

const PreviewModeBanner = ({ location }) => {
  return (
    <div className="py-4 bg-red-600 text-red-100 font-semibold uppercase tracking-wide">
      <div className="container">
        Preview mode is on.{" "}
        <button
          className="underline"
          onClick={() => {
            // The cookie will be deleted by a useEffect in the Section component
            navigate("/", { state: { prevPath: location.pathname } })
          }}
        >
          Turn off
        </button>
      </div>
    </div>
  )
}

// Display a section individually
const Section = ({ sectionData, products, articles }) => {
  // Prepare the component
  const SectionComponent =
    sectionComponents[sectionData.strapi_component || sectionData.__component]

  if (!SectionComponent) {
    // No matching component for this page section
    return null
  }

  // Display the section
  return (
    <SectionComponent
      data={sectionData}
      products={products}
      articles={articles}
    />
  )
}

// Display the list of sections
const Sections = ({ sections, products, articles }) => {
  const location = useLocation()
  // Ignore unused destructured variable
  // eslint-disable-next-line
  const [cookies, _, removeCookie] = useCookies(["strapiPreview"])

  useEffect(() => {
    // The preview cookie is deleted when state.prevPath exists on location
    if (location.state && location.state.prevPath) {
      removeCookie("strapiPreview", {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      })
    }
  }, [location, removeCookie])

  const previewModeIsEnabled =
    process.env.GATSBY_PREVIEW_SECRET &&
    cookies.strapiPreview === process.env.GATSBY_PREVIEW_SECRET

  return (
    <div className="flex flex-col">
      {previewModeIsEnabled && <PreviewModeBanner location={location} />}
      {sections.map((section, i) => (
        <Section
          sectionData={section}
          key={`${section.strapi_component}${(section.id, i)}`}
          products={products}
          articles={articles}
        />
      ))}
    </div>
  )
}

export default Sections
