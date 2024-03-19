import React from "react";

const BrandInfo = () => {
  return (
    <div>
      <section className="overflow-hidden rounded-lg shadow-2xl md:grid md:grid-cols-3 mt-8">
        <img
          alt="Brand Logo"
          src="https://images.unsplash.com/photo-1576188973526-0e5d7047b0cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fGNsb3RoaW5nfGVufDB8fDB8fHww"
          className="h-32 w-full object-cover md:h-full"
        />

        <div className="p-4 text-center sm:p-6 md:col-span-2 lg:p-8">
          <p className="text-sm font-semibold uppercase tracking-widest">
            Welcome to LuxueLease
          </p>

          <h2 className="mt-6 font-black uppercase">
            <span className="text-4xl font-black sm:text-5xl lg:text-6xl">
              Discover Effortless Fashion
            </span>

            <span className="mt-2 block text-sm">
              Indulge in high-end style without the hefty price tag
            </span>
          </h2>

          <p className="mt-8">
            At LuxueLease, we redefine the way you access premium fashion.
            Explore a curated collection of high-end fashion items from renowned
            designers and brands. Our diverse catalog ensures you have access to
            the latest trends for every occasion. Getting started is a breeze!
            Sign up or log in to your LuxueLease account in seconds. Your
            journey to a stylish wardrobe begins here.
          </p>

          <button
            className="mt-8 inline-block w-full bg-black py-4 text-sm font-bold uppercase tracking-widest text-white"
            href="/"
          >
            Explore Our Collection
          </button>

          <p className="mt-8 text-xs font-medium uppercase text-gray-400">
            Elevate your style with LuxueLease - Where Fashion Meets
            Flexibility.
          </p>
        </div>
      </section>
    </div>
  );
};

export default BrandInfo;
