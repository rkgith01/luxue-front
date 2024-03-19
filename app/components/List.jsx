import React from "react";
import Card from "./Card";
import useFetch from "../hooks/useFetch";

const List = ({ catId, subCats, maxPrice, sort }) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][categories][id]=${catId}${subCats
      .map((item) => `&[filters][sub_categories][id][$eq]=${item}`)
      .join("")}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
  );

  // console.log(data)
  // can add &sort=title:${sort}

  return (
    <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 xsm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {error
        ? `something went wrong ${JSON.stringify(error)}`
        : loading
        ? "loading"
        : data?.map((item, index) => <Card key={index} item={item} />)}
    </ul>
  );
};

export default List;
