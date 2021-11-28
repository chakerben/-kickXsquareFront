import React from "react"
import Card from "./card"
import { useBreakpointValue } from "@chakra-ui/react"
import Caroussel from "./carousel"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import head from "loadsh/head"
const Articles = ({ articles, pageContext, categ }) => {
  console.log(articles)
  const slidesToShow = useBreakpointValue({ base: 2, sm: 2, md: 4, lg: 6 })
  const slideWidth = useBreakpointValue({
    base: 250,
    sm: 250,
    md: 400,
    lg: 400,
  })
  const slideHeight = useBreakpointValue({
    base: 250,
    sm: 250,
    md: 400,
    lg: 400,
  })
  const displayArrow = useBreakpointValue({
    base: false,
    sm: false,
    md: true,
    lg: true,
  })
  const PrevArrow = (props) => {
    const { onClick } = props
    return (
      <ChevronLeftIcon
        width="20px"
        onClick={onClick}
        color="white"
        style={{
          marginRight: "10px",
          cursor: "pointer",
          backgroundColor: "#2f2f2f",
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          zIndex: "1",
          padding: "0.8%",
        }}
      />
    )
  }

  const NextArrow = (props) => {
    const { onClick } = props
    return (
      <ChevronRightIcon
        width="20px"
        onClick={onClick}
        color="white"
        style={{
          marginLeft: "10px",
          cursor: "pointer",
          backgroundColor: "#2f2f2f",
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          zIndex: "1",
          padding: "0.8%",
        }}
      />
    )
  }

  return (
    <div className="uk-child-width-1-2@s container blog" data-uk-grid="true">
      <h1 className="title">Introducing Paige Bueckers</h1>
      <div className="text-left sm:py-10 xl:py-40 lg:py-40">
        {categ?.map((category, i) => {
          const articlesCateg = articles?.filter(
            (article) => article.node.category.name === category.name
          )
          if (articlesCateg?.length > 0) {
            return (
              <>
                <Card
                  article={head(articlesCateg)}
                  pageContext={pageContext}
                  key={`article_head__${i}`}
                  type="NewsPageHead"
                />
                <Caroussel
                  slideWidth={slideWidth}
                  slideHeight={slideHeight}
                  direction="row"
                  slidesToShow={slidesToShow}
                  slidesToScroll={slidesToShow}
                  nextArrow={NextArrow}
                  prevArrow={PrevArrow}
                  displayDots={false}
                  hideNullableArrow={true}
                  displayArrow={displayArrow}
                  gap={8}
                  key={`caroussel_${i}`}
                  title={category.name}
                >
                  {articlesCateg?.map((article) => (
                    <Card
                      article={article}
                      pageContext={pageContext}
                      key={`article__left__${article.node.slug}`}
                      type="NewsPage"
                    />
                  ))}
                </Caroussel>
              </>
            )
          }
        })}
      </div>
    </div>
  )
}

export default Articles
