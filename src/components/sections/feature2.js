import React from "react"
import Image from "../image"
import CustomLink from "../elements/custom-link"
import PowerPicture from "../../images/power.gif"
const Feature2 = ({ data }) => {
  return (
    <div className="container">
      <h2 className="text-center text-5xl font-bold py-6">{data?.title}</h2>
      <div className=" flex gap-12 py-12 flex-col sm:flex-col lg:flex-row  xl:flex-row md:flex-row">
        <div className="text-center w-auto xl:w-1/3 lg:w-1/3 md:w-1/3 sm:w-auto m-auto">
          <h3 className="text-2xl font-bold mb-4">{data?.leftTitle}</h3>
          <div className="mb-8 text-xl">{data?.leftDescription}</div>
          <CustomLink
            link={{
              url: data?.leftLink?.link,
              id: "leftLink",
              text: data?.leftLink?.label,
            }}
            style={{ color: "#006340", fontSize: "16px", fontWeight: "bold" }}
          >
            {data?.leftLink.label + " +++++"}
          </CustomLink>
        </div>
        <div style={{ position: "relative" }}>
          <img src={PowerPicture} alt="power" />
          <Image
            media={data?.Image}
            style={{
              position: "absolute",
              zIndex: "5",
              bottom: "-50px",
              right: "50%",
              width: "75%",
              transform: "translateX(50%)",
            }}
          />
        </div>
        <div className=" text-center m-auto w-auto xl:w-1/3 lg:w-1/3 md:w-1/3 sm:w-auto">
          <h3 className="text-2xl font-bold mb-4">{data?.rightTitle}</h3>
          <div className="mb-8 text-xl">{data?.rightDescription}</div>
          <CustomLink
            link={{
              url: data?.rightLink?.link,
              id: "rightLink",
              text: data?.rightLink?.label,
            }}
            style={{ color: "#006340", fontSize: "16px", fontWeight: "bold" }}
          >
            {data?.rightLink.label + " +++++"}
          </CustomLink>
        </div>
      </div>
    </div>
  )
}

export default Feature2
