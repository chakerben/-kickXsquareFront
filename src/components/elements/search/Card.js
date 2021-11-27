import React from "react";
import { Link } from "gatsby";
import DefaultImage from "../../../images/defaultImage.png";
import { Divider, Flex, Box } from "@chakra-ui/react";

const Card = ({ product }) => {
  const image = product?._sneaker_ref?.miniature?.url
    ? product?._sneaker_ref?.miniature?.url
    : product?.miniature?.url;
  const fullName = product?._sneaker_ref?.full_name
    ? product?._sneaker_ref?.full_name
    : product?.full_name;
  const name = product?._sneaker_ref?.full_name
    ? product?._sneaker_ref?.nick_name
    : product?.nick_name;
  return (
    <Box>
      <Divider colorScheme="grey" />
      <Link to={`/sneakers/${product?.slug}`}>
        <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5 flex  py-3 px-4">
          {image ? (
            <img
              width={140}
              height={75}
              src={image}
              placeholder="blurred"
              alt={name}
            />
          ) : (
            <img
              width={140}
              height={75}
              src={DefaultImage}
              placeholder="blurred"
              alt={name}
            />
          )}
          <div className="text-left px-2 font-bold">
            <h3 className="text-lg">{name}</h3>
            <h3 className="text-lg">{fullName}</h3>
          </div>
        </div>
      </Link>
    </Box>
  );
};

export default Card;
