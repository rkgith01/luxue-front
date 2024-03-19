"use client";
import { ArrowDown } from "lucide-react";
// import Card from '../../components/Card';
import React, { useState } from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import List from "../../components/List";
import { useParams } from "next/navigation";
import useFetch from "../../hooks/useFetch";
const Category = () => {
  const catId = parseInt(useParams()?.productId);

  // console.log(catId)

  const [isFiltersOpen, setFiltersOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState("desc");

  const [selectedSubCat, setselectedSubCat] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    const ifChecked = e.target.checked;

    setselectedSubCat(
      ifChecked
        ? [...selectedSubCat, value]
        : selectedSubCat.filter((item) => item !== value)
    );
  };
  // console.log(selectedSubCat)
  const { data, loading, error } = useFetch(
    `/sub-categories?[filters][categories][id][$eq]=${catId}`
  );

  // console.log("data:",data)

  return (
    <div>
      {/* <h1 className='text-3xl'>Multi product category section</h1> */}
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <BreadCrumbs path={`/category`} />

          {/* Top Image of category */}
          <div className="float-right justify-center w-[710px] mt-5 h-[500px]">
            {/* <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGNhdGVnb3JpZXMlMjBjbG90aGluZ3xlbnwwfHwwfHx8MA%3D%3D" alt='categories photo' className='w-[100vw] h-[350px] obeject-cover'/> */}
            <img
              src="/catlogo.jpg"
              alt="categories photo"
              className="w-[100%] h-[350px] obeject-contain"
            />
          </div>

          {/* Header of categories */}
          <header>
            <h1 className="mt-7 text-xl font-bold text-gray-400 sm:text-3xl">
              Product Categories
            </h1>

            <p className="mt-4 max-w-md text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
              praesentium cumque iure dicta incidunt est ipsam, officia dolor
              fugit natus?
            </p>
          </header>

          {/* mobile btn */}
          <div
            style={{
              position: "sticky",
              top: "1.5rem", // Adjust the top value as needed
              zIndex: "50",
              backgroundColor: "black",
            }}
            className="flex items-center justify-between p-4 border border-gray-100 rounded-lg shadow-sm w-full lg:hidden"
            onClick={() => setFiltersOpen(!isFiltersOpen)}
          >
            <span className="text-sm font-medium"> Filters & Sorting </span>
            <ArrowDown size={16} />
          </div>

          {/* bigger container to style the products and sorting col  */}
          <div className="w-full flex gap-8">
            <div className="mt-4 lg:mt-8 gap-8">
              {/* <div className="mt-4 lg:mt-8 flex gap-8 "> */}

              {/* Filter sections */}
              {!isFiltersOpen && (
                <div
                  className="space-y-4 lg:block mt-2"
                  style={{
                    position: "sticky",
                    top: "5rem", // Adjust the top value as needed
                    zIndex: "45",
                    backgroundColor: "black",
                  }}
                >
                  {/* soritng data options */}
                  <div>
                    <div className="text-xl lg:text-2xl xl:text-3xl">
                      Sort by
                    </div>
                    {/* <div className="inputItem mt-2 flex items-center">
                    <input
                      type="radio"
                      id="asc"
                      value="asc"
                      name="price"
                      onChange={() => setSort("asc")}
                      className="mr-2"
                    />
                    <label htmlFor="asc" className="text-sm lg:text-base">
                      Price (Lowest first)
                    </label>
                  </div>
                  <div className="inputItem mt-2 flex items-center">
                    <input
                      type="radio"
                      id="desc"
                      value="desc"
                      name="price"
                      onChange={() => setSort("desc")}
                      className="mr-2"
                    />
                    <label htmlFor="desc" className="text-sm lg:text-base">
                      Price (Highest first)
                    </label>
                  </div>
                  <div className="inputItem mt-2 flex items-center">
                    <input
                      type="radio"
                      id="desc"
                      value="desc"
                      name="price"
                      onChange={() => setSort("desc")}
                      className="mr-2"
                    />
                    <label htmlFor="desc" className="text-sm lg:text-base">
                      Name (Z-A)
                    </label>
                  </div>
                  <div className="inputItem mt-2 flex items-center">
                    <input
                      type="radio"
                      id="asc"
                      value="asc"
                      name="price"
                      onChange={() => setSort("asc")}
                      className="mr-2"
                    />
                    <label htmlFor="asc" className="text-sm lg:text-base">
                      Name (A-Z)
                    </label>
                  </div> */}
                    {["asc", "desc"].map((value) => (
                      <div
                        className="inputItem mt-2 flex items-center"
                        key={value}
                      >
                        <input
                          type="radio"
                          id={value}
                          value={value}
                          name="price"
                          checked={sort === value}
                          onChange={() => setSort(value)}
                          className="mr-2"
                        />
                        <label htmlFor={value} className="text-sm lg:text-base">
                          {value === "asc"
                            ? "Price (Lowest first)"
                            : "Price (Highest first)"}
                        </label>
                      </div>
                    ))}
                    {/* {['asc', 'desc'].map((value) => (
                    <div
                      className="inputItem mt-2 flex items-center"
                      key={value}
                    >
                      <input
                        type="radio"
                        id={`title_${value}`}
                        value={value}
                        name="title"
                        checked={sort === value}
                        onChange={() => setSort(value)}
                        className="mr-2"
                      />
                      <label htmlFor={`title_${value}`} className="text-sm lg:text-base">
                        {value === 'desc'
                          ? 'Name (Z-A)'
                          : 'Name (A-Z)'}
                      </label>
                    </div>
                  ))} */}
                  </div>

                  <div className="overflow-hidden rounded border flex flex-col items-start p-4 border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                    {data?.map((item) => (
                      <label
                        htmlFor={item.id}
                        className="flex items-center gap-2"
                        key={item.id}
                      >
                        <input
                          type="checkbox"
                          id={item.id}
                          className="mt-1 h-6 w-6 text-indigo-600"
                          value={item.id}
                          onChange={handleChange}
                        />
                        <span className="text-sm font-medium text-gray-400">
                          {" "}
                          {item?.attributes.title}{" "}
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className="rounded border-t border-gray-200 bg-slate-500">
                    <span className="flex cursor-pointer items-center justify-between gap-1 p-4 text-gray-200 transition text-sm font-medium">
                      {" "}
                      Price{" "}
                    </span>
                    <header className="flex items-center justify-between p-4">
                      <span className="text-sm text-gray-700">
                        {" "}
                        The highest price is $1000{" "}
                      </span>
                      <button
                        type="button"
                        className="text-sm text-gray-900 underline underline-offset-4"
                      >
                        Reset
                      </button>
                    </header>

                    <div className="border-t border-gray-200 p-4">
                      <label
                        htmlFor="FilterPriceRange"
                        className="block text-sm text-gray-400"
                      >
                        Price Range
                      </label>
                      <div className="flex justify-between gap-4">
                        <span className="text-sm text-gray-600">$</span>
                        <input
                          type="range"
                          id="FilterPriceRange"
                          min={0}
                          max={1000}
                          // step="10"
                          onChange={(e) => setMaxPrice(e.target.value)}
                          className="flex-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        />
                        <span className="text-sm text-gray-600">
                          ${maxPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* card list in collection old */}
            <div className=" mt-5 w-full">
              <List
                catId={catId}
                maxPrice={maxPrice}
                sort={sort}
                subCats={selectedSubCat}
              />
              {/* card list in collection new */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Category;
