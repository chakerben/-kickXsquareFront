import React from "react"
import Image from "../image"

const FeatureColumnsGroup = ({ data }) => {
  return (
    <div style={{ backgroundColor: "#f6f6f6" }}>
      <div className="container grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 gap-8 align-top py-12">
        {data.features.map((feature) => (
          <div className="flex-1 text-lg text-center" key={feature.id}>
            <Image media={feature.icon} className="w-16 text-center m-auto" />
            <h3 className="font-bold mt-4 mb-4">{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeatureColumnsGroup
