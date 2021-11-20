import React from "react"
import Image from "../image"
import PropTypes from "prop-types"
import { linkPropTypes, mediaPropTypes } from "@/utils/types"
import CustomLink from "./custom-link"

const Footer = ({ footer }) => {
  return (
    <footer className="pt-12 bg-gray-900">
      <div className="container">
        {/*<div>
          {footer.logo && (
            <Image style={{ width: "112px"}} media={footer.logo} className="h-8 w-auto object-contain" />
          )}
          </div>*/}
        <nav className="flex flex-wrap flex-row lg:gap-20 items-start lg:justify-between mb-10">
          {footer.columns.map(footerColumn => (
            <div
              key={footerColumn.id}
              className="mt-10 lg:mt-0 w-6/12 lg:w-auto"
            >
              <p className="uppercase tracking-wide font-semibold text-white">
                {footerColumn.title}
              </p>
              <ul className="mt-2">
                {footerColumn?.links?.map(link => (
                  <li
                    key={link?.id}
                    className="text-gray-500 py-1 px-1 -mx-1 hover:text-green-700"
                  >
                    <CustomLink link={link}>{link.text}</CustomLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="text-sm bg-gray-900 py-6 text-white border-t-2 border-solid border-white ">
        <div className="container">{footer.smallText}</div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  footer: PropTypes.shape({
    logo: mediaPropTypes.isRequired,
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        title: PropTypes.string.isRequired,
        links: PropTypes.arrayOf(linkPropTypes),
      })
    ),
    smallText: PropTypes.string.isRequired,
  }),
}

export default Footer
