import React from "react"
import { getStrapiMedia } from "../../utils/media"
import { Divider } from "@chakra-ui/react"

const HeaderPage = ({ data }) => {
  const bgImage = getStrapiMedia(data?.background?.url)
  return (
    <>
      <Divider colorScheme="grey" />
      <section
        className="bg-gray-200  lg:py-18 lg:px-3 px-4 py-12 container"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <main className="container flex flex-col md:flex-row items-center justify-between py-2 ">
          {/* Left column for content */}
          <div className="flex-1 sm:pr-8">
            {/* Big title */}
            <h1 className=" mt-2 sm:mt-0 mb-4 sm:mb-2 font-bold text-7xl text-black">
              {data?.title}
            </h1>
            {/* Description paragraph */}
            <p className="text-2xl text-black  mb-6 w-2/5 md:w-2/4">
              {data?.description}
            </p>
          </div>
        </main>
      </section>
    </>
  )
}

export default HeaderPage
