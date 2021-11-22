const path = require("path")
const { getLocalizedPaths } = require("./src/utils/localize")
const {
  getBrand,
  getMostPopularSneakers,
  getRecentlyViewed,
  getSneakersByBrand,
  getListSneakers,
  getImage360,
  getSize,
  getListSize,
} = require("./src/api/sneaker")

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info

  const {
    data: {
      site: {
        siteMetadata: {
          languages: { locales, defaultLocale },
        },
      },
    },
  } = await graphql(`
    query {
      site {
        siteMetadata {
          languages {
            locales
            defaultLocale
          }
        }
      }
    }
  `)

  const localePages = locales.map(async locale => {
    const { data } = await graphql(
      `
        query pagesQuery($locale: String!) {
          allStrapiPage(
            filter: { locale: { eq: $locale }, status: { eq: "published" } }
          ) {
            nodes {
              slug
              id
              locale
            }
          }
        }
      `,
      { locale: locale }
    )

    return data.allStrapiPage.nodes
  })
  //get list sneakers
  const listSneakers = await getListSneakers()
  let listSizes = await getListSize()
  listSizes.sort(function (a, b) {
    return a.us - b.us
  })
  //create all products page
  const Product = path.resolve("./src/templates/productPage.js")
  const PageTemplate = path.resolve("./src/templates/page.js")
  const BrandPage = path.resolve("./src/templates/brandPage.js")
  const SearchPage = path.resolve("./src/templates/searchPage.js")
  const SneakersPage = path.resolve("./src/templates/sneakersPage.js")
  listSneakers &&
    listSneakers?.map(prod => {
      const slug = prod?.nick_name
        ?.toLowerCase()
        ?.replace(/ /g, "-")
        ?.replace(/[^\w-]+/g, "")
      prod.slug = slug
      const context = {
        slug: prod.slug,
        prod: prod,
        sizes: listSizes,
      }
      createPage({
        path: `/sneakers/${prod.slug}`,
        component: Product,
        context: {
          ...context,
        },
      })
    })

  //category on home page (recommended by us, brand , popular)
  let products = {
    brand: await getBrand(),
    recomended: await getMostPopularSneakers(),
    popular: await getRecentlyViewed(),
  }
  const contextRecomended = {
    slug: "sneakers/most-popular",
    sneakers: products?.recomended,
    sizes: listSizes,
  }
  createPage({
    path: `/${contextRecomended.slug}`,
    component: SneakersPage,
    context: {
      ...contextRecomended,
    },
  })
  const contextPopular = {
    slug: "sneakers/recommended",
    sneakers: products?.popular,
    sizes: listSizes,
  }
  createPage({
    path: `/${contextPopular.slug}`,
    component: SneakersPage,
    context: {
      ...contextPopular,
    },
  })
  const pages = await (await Promise.all(localePages)).flat()
  //add Slug for products
  products?.recomended?.map(async prod => {
    let name = prod?.nick_name ? prod?.nick_name : prod?._sneaker_ref?.nick_name
    const slug = name
      ?.toLowerCase()
      ?.replace(/ /g, "-")
      ?.replace(/[^\w-]+/g, "")
    prod.slug = slug
  })
  products?.popular?.map(async prod => {
    let name = prod?.nick_name ? prod?.nick_name : prod?._sneaker_ref?.nick_name
    const slug = name
      ?.toLowerCase()
      ?.replace(/ /g, "-")
      ?.replace(/[^\w-]+/g, "")
    prod.slug = slug
  })

  products?.brand?.map(async categ => {
    const slug = categ?.name
      ?.toLowerCase()
      ?.replace(/ /g, "-")
      ?.replace(/[^\w-]+/g, "")
    categ.slug = slug
    categ.list = await getSneakersByBrand(categ.id)
  })
  //create brand page
  products?.brand?.map(prod => {
    const context = {
      slug: prod.slug,
      prod: prod,
      sizes: listSizes,
    }
    createPage({
      path: `/${prod.slug}`,
      component: BrandPage,
      context: {
        ...context,
      },
    })
  })
  //Create search page
  const context = {
    slug: "search",
    listSneakers: listSneakers,
    sizes: listSizes,
  }
  createPage({
    path: "/search",
    component: SearchPage,
    context: {
      ...context,
    },
  })
  // Create all non-root pages based on Strapi data
  pages.forEach(page => {
    const slug = page.slug ? page.slug : ""
    // The default locale has no prefix
    // The root of all other locales should be the locale code (i.e. /fr)
    const localePrefix =
      page.locale === defaultLocale || locales.includes(page.slug)
        ? ""
        : page.locale

    const context = {
      slug: page.slug,
      id: page.id,
      locale: page.locale,
      locales,
      defaultLocale,
      products: products,
      listSneakers: listSneakers,
      sizes: listSizes,
    }

    const localizedPaths = getLocalizedPaths(context)

    createPage({
      path: `${localePrefix}/${slug}`,
      component: PageTemplate,
      context: {
        ...context,
        localizedPaths,
      },
    })
  })

  const PreviewPage = path.resolve("./src/templates/preview.js")

  locales.forEach(locale => {
    const params = {
      path: `${locale}/preview/`,
      component: PreviewPage,
      context: {
        locale,
      },
    }
    createPage(params)
    // Assures onCreatePage is called since it's currently not for programmatically created pages in
    // gatsby-node.js. It only works for plugin created pages and pages in the `/pages` folder.
    // NOTE: If Gatsby issue #5255 is ever fixed we'll want to remove this code else onCreatePages will be called twice.
    // Workaround proposed here: https://github.com/gatsbyjs/gatsby/issues/5255#issuecomment-721330474
    onCreatePage({
      page: params,
      actions: { createPage },
    })
  })
}

onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  if (page.path.includes("preview")) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/:locale/preview/:slug"
    // Update the page.
    createPage(page)
  }
}
