"use client";
import React from "react";
import Card from "./Card";
import useFetch from "../hooks/useFetch";

const FeaturedProducts = ({ type }) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`
  );
  // console.log("featured data:",data)
  return (
    <section className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <header className="text-left flex items-center justify-between">
        <h2 className="capitalize text-xl font-bold text-gray-300 sm:text-3xl">
          {type} Collection
        </h2>
        <p className="mx-auto mt-4 max-w-md text-gray-500 ">
          Discover the latest in {type} fashion. Explore our curated collection
          and find the perfect pieces to elevate your style.
        </p>
      </header>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {error
          ? "Something went wrong!"
          : loading
          ? "loading"
          : data?.map((item) => <Card item={item} key={item.id} />)}
      </ul>
    </section>
  );
};

export default FeaturedProducts;
