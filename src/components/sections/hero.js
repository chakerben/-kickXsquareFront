import React from "react"
import Markdown from "react-markdown"
import Image from "../image"
import CustomLink from "../elements/custom-link"
import { ring } from "@chakra-ui/styled-system"

const Hero = ({ data }) => {
  return (
    <section className="bg-gray-900  lg:py-20 lg:px-3 px-4 py-4">
      <main className="container flex flex-col md:flex-row items-center justify-between py-12 ">
        {/* Left column for content */}
        <div className="flex-1 sm:pr-8">
          {/* Big title */}
          <h1 className=" mt-2 sm:mt-0 mb-4 sm:mb-2 font-bold text-7xl text-white">
            {data.title}
          </h1>
          {/* Description paragraph */}
          <p className="text-xl text-white  mb-6">{data.description}</p>
          {/* Small rich text */}
          <div className=" text-xl text-white mt-4 sm:mt-3 rich-text-hero">
            <Markdown source={data.smallTextWithLink} />
          </div>
        </div>
        {/* Right column for the image */}
        <Image
          media={data.picture}
          className="flex-shrink-0 object-contain w-full md:w-6/12 mt-6 md:mt-0"
        />
        {/* Buttons row */}
      </main>
      <div className="flex flex-col lg:flex-row flex-wrap gap-4 m-auto text-center justify-center py-6">
        {data.buttons.map((button) => (
          <a
            href={button.url}
            key={button.id}
            style={{
              backgroundColor: "#006340",
              fontSize: "16px",
              fontWeight: "bold",
              color: "white",
              marginBottom: "15px",
            }}
            className="w-3/4 m-auto lg:m-px lg:py-5 lg:px-6 py-2 lg:w-auto "
          >
            <span style={{ marginRight: "30px" }} className="text-left">
              {button.text}
            </span>
            <span className="text-right"> +++++</span>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Hero
