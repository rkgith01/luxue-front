"use client";
import React, { useState } from "react";
import {
  Heart,
  MinusCircle,
  PlusCircle,
  RefreshCcw,
  Shapes,
  ShoppingBag,
} from "lucide-react";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartReducer";

function ProductCardPage({ id }) {
  const products = useSelector((state) => state.cart.products);

  const { data, loading, error } = useFetch(`/products/${id}?populate=*`);
  // console.log(products)
  // console.log(data)

  // Placeholder data
  const itemTitle = data?.attributes.title;
  const itemDescription = data?.attributes.desc;
  const pricing = data?.attributes.price;
  const oldPrice = data?.attributes.price + 40;
  const mainImageUrl = data?.attributes?.img.data.attributes.url;
  const secondImage = data?.attributes?.img2.data.attributes.url;
  const imageOptions = [mainImageUrl, secondImage];
  const category = data?.attributes?.type;

  // const sizeS = data?.attributes?.size[0].children[0].text
  // const sizeM = data?.attributes?.size[1].children[0].text
  // const sizeL = data?.attributes?.size[2].children[0].text

  const [selectedImage, setSelectedImage] = useState(imageOptions[0]);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  // const [selectedSize, setSelectedSize] = useState(sizeS);

  // const handleSelectedSize = (size) => {
  //   // selectedSize = e.target.value
  //   setSelectedSize(size);

  //   if(!size) setSelectedSize("One Size")

  //   let sizes = [sizeS, sizeM, sizeL]
  //   if(sizes.includes(size)) {
  //     setSelectedSize(size)
  //   }else {
  //     setSelectedSize("One Size")
  //   }
  // }

  return (
    <div className="p-2 py-32 px-10 md:px-38   rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 justify-center">
        {/* Project Banner */}
        {mainImageUrl ? (
          <div>
            <img
              src={
                imageOptions[selectedImage]
                  ? imageOptions[selectedImage]
                  : mainImageUrl
              }
              alt="Banner"
              width={820}
              height={350}
              className="rounded object-coversm:h-[300px] md:h-[600px] lg:h-full"
            />
          </div>
        ) : (
          <div className="rounded w-[550px] h-[650px] sm:w[450px] bg-slate-300 animate-pulse sm:float-left object-cover">
            {loading && (
              <p className="items-center justify-center text-center  text-gray-900">
                <RefreshCcw
                  size={50}
                  className=" animate-spin text-gray-900 sm:ml-[10rem] sm:mt-[10rem] lg:ml-[15rem] lg:mt-[15rem]"
                />
              </p>
            )}
          </div>
        )}

        {/* Image Options (Visible on Smaller Screens) */}

        <div className="md:hidden flex justify-center gap-2 mt-4">
          {imageOptions.map((option, index) => (
            <div key={index}>
              <img
                src={option}
                alt={`Option ${index + 1}`}
                width={80}
                height={80}
                className="rounded-md object-cover"
                onClick={() => setSelectedImage(index)}
              />
            </div>
          ))}
        </div>
        {/* Project Info */}
        <div className=" ml-2 flex flex-col justify-center cursor-pointer mb-5">
          {itemTitle || itemDescription || pricing || oldPrice || category ? (
            <div className="flex flex-col">
              <h2 className="border-b-2 w-[50%] text-xl lg:text-2xl font-medium mb-3">
                {itemTitle}
              </h2>

              <h2 className="text-lg lg:text-xl font-medium line-through">
                ${oldPrice ? oldPrice : "Loading"}
              </h2>
              <h2 className="text-lg lg:text-3xl font-medium mt-4 lg:mt-0">
                ${pricing}
              </h2>

              <p className="capitalize border w-[100px] p-2 text-sm lg:text-[1rem] italic line-clamp-2 lg:line-clamp-3 mt-2">
                {category}
              </p>
              <p className="leading-loose text-sm lg:text-[1rem] italic line-clamp-2 lg:line-clamp-3 mt-2">
                {itemDescription}
              </p>

              {/* sizing */}
              {/* <div className='flex justify-center rounded mt-5  gap-6 w-[50%] border-2 pb-4'>
              <p
                className={`leading-loose text-sm lg:text-[1rem] italic px-4 py-2 rounded mt-2 hover:border-2 ${
                  selectedSize === sizeS ? 'border-2' : ''
                }`}
                onClick={() => handleSelectedSize(sizeS)}
              >
                {sizeS}
              </p>
              <p
                className={`leading-loose text-sm lg:text-[1rem] italic px-4 py-2 rounded mt-2 hover:border-2 ${
                  selectedSize === sizeM ? 'border-2' : ''
                }`}
                onClick={() => handleSelectedSize(sizeM)}
              >
                {sizeM}
              </p>
              <p
                className={`leading-loose text-sm lg:text-[1rem] italic px-4 py-2 rounded mt-2 hover:border-2 ${
                  selectedSize === sizeL ? 'border-2' : ''
                }`}
                onClick={() => handleSelectedSize(sizeL)}
              >
                {sizeL}
              </p>
            </div> */}

              {/* Quantity */}
              <div className="mt-4">
                <div className="quantity flex items-center gap-10">
                  <button
                    onClick={() =>
                      setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                    }
                    className="w-50 h-50 flex items-center justify-center cursor-pointer border-none"
                  >
                    <MinusCircle size={24} />
                  </button>
                  {quantity}
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-50 h-50 flex items-center justify-center cursor-pointer border-none"
                  >
                    <PlusCircle size={24} />
                  </button>
                </div>
              </div>
              {/* Add to Cart Button */}
              <div
                className="mt-5 flex  justify-center items-center gap-2 bg-slate-800 p-3 w-[50%] rounded
            hover:bg-slate-600 cursor-pointer"
                onClick={() =>
                  dispatch(
                    addToCart({
                      ...products,
                      id: data.id,
                      title: data.attributes.title,
                      desc: data.attributes.desc,
                      price: data.attributes.price,
                      img: data.attributes.img.data.attributes.url,
                      quantity,
                    })
                  )
                }
              >
                <ShoppingBag size={24} /> Add to Cart
              </div>

              {/* Add to wishList Button + Compare Products btn */}
              <div className="mt-5 flex items-center gap-3 cursor-pointer">
                <div className="mt-5 flex items-center gap-3 cursor-pointer">
                  <Heart size={20} /> Add to wishList
                </div>
                <div className="mt-5 flex items-center gap-3 cursor-pointer">
                  <Shapes size={20} /> Compare Products
                </div>
              </div>

              {/* vendors data */}
              <div className="mt-5 flex flex-col gap-3 cursor-pointer">
                <h2>
                  Vendor: <span> Polo </span>
                </h2>
                <p>
                  Product: <span> product title</span>
                </p>
                <p>Tag: produt tags</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:w-[50%] sm:h-[50%] lg:w-[100%] lg:h-[100%] bg-slate-300">
              {loading && (
                <p className="items-center justify-center text-center  text-gray-900">
                  <RefreshCcw
                    size={50}
                    className=" animate-spin text-gray-900 sm:ml-[10rem] sm:mt-[10rem] lg:ml-[15rem] lg:mt-[15rem]"
                  />
                </p>
              )}
            </div>
          )}

          {/* BORDER */}
          <p className="border-b mt-2"></p>

          {/* description meta data  */}
          <div className="flex flex-col gap-3 cursor-pointer">
            <div className="mt-5 flex items-center gap-3 cursor-pointer">
              <h1 className="text-uppercase underline">Desctription</h1>
            </div>
            <div className="mt-5 flex items-center gap-3 cursor-pointer">
              <h1 className="text-uppercase underline">Additional Info</h1>
            </div>
            <div className="mt-5 flex items-center gap-3 cursor-pointer">
              <h1 className="text-uppercase underline">FAQ</h1>
            </div>
          </div>
        </div>

        {/* Image Options (Visible on Larger Screens) */}

        <div className="hidden md:flex gap-4 justify-center items-center mt-4">
          {imageOptions.map((option, index) => (
            <div key={index} className="mb-2">
              <img
                src={option}
                alt={`Option ${index + 1}`}
                width={80}
                height={80}
                className="rounded-md object-cover"
                onClick={() => setSelectedImage(index)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* <div className='w-[80px] h-[100px]  bg-slate-300'></div> */}
    </div>
  );
}

export default ProductCardPage;
