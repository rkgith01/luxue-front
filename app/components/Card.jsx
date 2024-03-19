import Link from "next/link";
import React from "react";

const Card = ({ item }) => {
  return (
    <Link className="group block overflow-hidden" href={`/products/${item.id}`}>
      <div>
        {/* {console.log(item)} */}
        <div className="relative h-[350px] sm:h-[450px]">
          <img
            src={item?.attributes?.img.data.attributes.url}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
          />

          {item?.attributes?.img2.data.attributes.url && (
            <img
              src={
                item?.attributes?.img2.data.attributes.url
                  ? item?.attributes?.img2.data.attributes.url
                  : item?.attributes?.img.data.attributes.url
              }
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
            />
          )}
        </div>

        <div className="relative bg-white pt-3">
          <h3 className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4">
            {item?.attributes?.title}
          </h3>

          <div className="mt-1.5 flex items-center gap-1.5 text-gray-900">
            <p className="text-gray-500 line-through">{`$${
              item?.attributes?.price + 20
            }`}</p>
            <p className="">{`$${item?.attributes?.price}`}</p>

            {item?.attributes?.isNew && (
              <p className="absolute right-2 text-right text-xs uppercase tracking-wide">
                New Arrival
              </p>
            )}
          </div>
        </div>
        {/* <a href={`/products/${item.id}`} className="group block overflow-hidden">
      </a> */}
      </div>
    </Link>
  );
};

export default Card;

// data.data[1].attributes.isNew
