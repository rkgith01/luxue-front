"use client";
import React, { useEffect, useState } from "react";
import { RiMenu5Fill } from "react-icons/ri";
import Image from "next/image";
import {
  ChevronDownIcon,
  Circle,
  SearchIcon,
  ShoppingCartIcon,
  User2Icon,
  X,
} from "lucide-react";
import Cart from "./Cart";
import { UserButton, useUser } from "@clerk/nextjs";
import { useSelector, useDispatch } from "react-redux";
import { resetCart } from "../store/cartReducer";
import Card from "./Card";
import useFetch from "../hooks/useFetch";

const NavBar = () => {
  const products = useSelector((state) => state.cart.products);

  const { data, loading, error } = useFetch(`/products?populate=*`);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // console.log(data)

  const navigationItems = [
    { label: "Men", href: `/category/1` },
    { label: "Women", href: "/category/2" },
    { label: "Sale", href: "/category/3" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/" },
    { label: "Contact", href: "/" },
    { label: "Stores", href: "/" },
    // { label: 'USD', href: '/' , icon: <ChevronDownIcon/>},
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // search params for success page or success payment done
  const dispatch = useDispatch();

  useEffect(() => {
    const handleSuccess = () => {
      if (window.location.href.includes("success")) {
        dispatch(resetCart());
      }
    };

    // Attach the success handling logic to the load event
    window.addEventListener("load", handleSuccess);

    // Cleanup event listener to avoid memory leaks
    return () => {
      window.removeEventListener("load", handleSuccess);
    };
  }, [dispatch]);

  // useEffect(() => {
  //   const isSuccessPage = window.location.href.includes("success");

  //   if (isSuccessPage) {
  //     dispatch(resetCart());
  //   }
  // }, [dispatch]);

  const { user } = useUser();

  useEffect(() => {
    setLoggedIn(window.location.href.toString().includes("sign-in"));
  });

  useEffect(() => {
    // Implement search product functionality
    const filteredData = data?.filter((product) =>
      product.attributes.title.toLowerCase().includes(searchItem.toLowerCase())
    );
    setFilteredData(filteredData);
  }, [searchItem, data]);

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  return (
    !loggedIn && (
      <div>
        <header className="bg-white dark:bg-gray-900">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 sticky z-50">
            <div className="flex h-[110px] items-center justify-between">
              {/* Logo */}
              <div className="md:flex md:items-center md:gap-12 h-[550px]">
                <a className="block text-teal-600 dark:text-teal-600" href="/">
                  <span className="sr-only">Home</span>
                  <img
                    src="/logo.jpeg"
                    alt="brand-logo"
                    className="h-[100px]  w-[100px] rounded-full shadow-sky-200 object-contain object-center"
                  />

                  {/* <Image src="/logo.jpeg" alt="Your Company" width={150} height={20}/> */}
                </a>
              </div>

              {/* Navigation */}
              <div className="hidden md:block">
                <nav aria-label="Global">
                  <ul className="flex items-center gap-6 text-sm">
                    {navigationItems.map(({ label, href, icon }, index) => (
                      <li key={index}>
                        <a
                          className="flex items-center gap-1  text-gray-500 text-[16px] transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                          href={href}
                        >
                          {label}
                          {icon}
                        </a>
                      </li>
                    ))}

                    {/* <li className='flex-auto'>
                     <p className='  text-gray-500'>USD</p>
                     <ChevronDownIcon/>
                  </li> */}
                  </ul>
                </nav>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-4">
                <div className="flex gap-4 ">
                  <div>
                    {/* Search Icon */}
                    <SearchIcon size={24} onClick={toggleSearchInput} />

                    <div className="relative mx-auto">
                      <div
                        className={`rounded flex items-center  absolute top-16 left-1/2 transform -translate-x-1/2 z-50 bg-blend-overlay bg-gray-700 ${
                          showSearchInput ? "visible" : "invisible"
                        }`}
                      >
                        <input
                          type="search"
                          value={searchItem}
                          onChange={(e) =>
                            setSearchItem(e.target.value) && focus(e)
                          }
                          placeholder="Search..."
                          className=" text-[18px] w-[350px] border-0  bg-gray-700 pl-8 pr-2 text-gray-100 m-2 p-2 placeholder:text-gray-400 focus:ring-0 text-center px-2 py-1 rounded shadow-slate-500 
                        select-none border-none focus:outline-none
                        transition duration-300 ease-in
                        "
                        />
                      </div>
                      {/* search result */}
                      {searchItem && (
                        <div className="fixed top-0 left-0 h-screen w-full flex flex-col overflow-y-auto items-center justify-center bg-black bg-opacity-50">
                          <div className="relative mx-auto w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-white p-4 rounded-lg overflow-y-auto">
                            <div className="absolute top-0 left-0 right-0 mt-4 mx-4 text-right">
                              <button
                                onClick={() => {
                                  setSearchItem("");
                                  setShowSearchInput(false);
                                }}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                Close
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
                              {filteredData.length > 0 ? (
                                filteredData.map((item) => (
                                  <Card item={item} key={item.id} />
                                ))
                              ) : (
                                <p className="text-gray-500 items-center text-center">
                                  No results found
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Close Search Input */}
                  </div>

                  {/* User Icon */}
                  {/* <User2Icon/> */}

                  {/* Cart Button */}
                  <div
                    className="flex cursor-pointer "
                    onClick={() =>
                      setOpen(!open) && setShowSearchInput(!showSearchInput)
                    }
                  >
                    <ShoppingCartIcon size={24} />

                    {products.length > 0 && (
                      <>
                        <Circle
                          size={24}
                          color="blue"
                          className="relative bottom-2 right-2"
                          fill="blue"
                        />
                        <span className="text-[14px] relative bottom-[0.4rem] right-[24px]   mr-0">
                          {products.length}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Login/Register Buttons */}

                {!user ? (
                  <div className="sm:flex sm:gap-4">
                    <a
                      className="rounded-md bg-slate-400 hover:bg-sky-600 px-5 py-2.5 text-sm font-medium text-white shadow dark:hover:bg-sky-600"
                      href="/sign-in"
                    >
                      Login
                    </a>

                    <div className="hidden sm:flex">
                      <a
                        className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                        href="/sign-up"
                      >
                        Register
                      </a>
                    </div>
                  </div>
                ) : (
                  <div>
                    <UserButton />
                  </div>
                )}

                <div className="block md:hidden">
                  <button
                    className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                    onClick={toggleMobileMenu}
                  >
                    {/* Menu Icon */}
                    <RiMenu5Fill />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Responsive Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden h-screen w-full bg-white dark:bg-gray-900">
              <nav aria-label="Global">
                <ul className="flex flex-col items-center gap-6 text-sm text-gray-500">
                  {navigationItems.map(({ label, href, icon }, index) => (
                    <li key={index}>
                      <a
                        className="flex items-center gap-1 text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                        href={href}
                        onClick={toggleMobileMenu}
                      >
                        {label}
                        {icon}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
        </header>
        {/* Cart opening  */}
        {open && <Cart />}
      </div>
    )
  );
};

export default NavBar;
