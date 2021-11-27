import React from "react";
import Card from "./Card";

const SearchList = ({ filteredProducts }) => {
  const filtered = filteredProducts.map((product) => (
    <Card key={product.id} product={product} />
  ));
  return <div>{filtered}</div>;
};

export default SearchList;
