"use client";
import React, { useState, useEffect } from "react";
import BreadCrumbs from "@/app/components/BreadCrumbs";
import { usePathname } from "next/navigation";
import ProductCardPage from "../_components/ProductCardPage";
import useFetch from "@/app/hooks/useFetch";
import Card from "@/app/components/Card";

// import Link from 'next/link'

const ProductsDetail = ({ params }) => {
  const path = usePathname();

  const { data, loading, error } = useFetch(`/products?populate=*`);

  // console.log(data)

  //  const [productSim, setProductSim] = useState([])

  const [productSim, setProductSim] = useState([]);

  useEffect(() => {
    if (data) {
      // Filter products based on categories "Women" and "Men"
      const filteredProducts = data.filter((item) => {
        const categoryTitle =
          item.attributes.categories.data[0]?.attributes.title;
        return categoryTitle === "Women" && "Man";
      });

      setProductSim(filteredProducts);
    }
    // else if (data) {
    //   const filteredProducts = data?.filter((item) => {
    //     const categoryTitle = item.attributes.categories.data[0]?.attributes.title;
    //     return categoryTitle === 'Man';
    //   });
    //   setProductSim(filteredProducts);
    // }
  }, [data]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[100%]">
      {/* height for breadcrumbs */}
      <div className="h-[50px]"></div>
      <BreadCrumbs path={path} />

      <ProductCardPage id={params.productId} />

      <h1 className="flex lg:text-3xl sm:text-xl md:text-2xl mb-2">
        Other Products to Check-out:
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {productSim.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductsDetail;
