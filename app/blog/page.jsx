import React from "react";
import Breadcrumbs from "../components/BreadCrumbs";

const BlogPage = () => {
  return (
    <div>
      <div className="w-full p-2 m-4">
        <Breadcrumbs path={"/blog"} />
      </div>
      <div className="flex flex-col md:flex-row bg-dark-100">
        {/* Image Section */}
        <div className="md:w-1/2 overflow-hidden">
          <img
            className="w-full h-full object-cover object-center"
            src="https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bHV4dXJ5JTIwY2xvdGhpbmd8ZW58MHwxfDB8fHwy"
            alt="Luxurious Fashion"
          />
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 p-8">
          <h1 className="text-3xl font-bold mb-4">
            LuxueLease - Elevate Your Style, Effortlessly
          </h1>
          <p className="text-gray-600 mb-6">
            Welcome to LuxueLease, where luxury meets accessibility. We redefine
            fashion by offering you the opportunity to adorn high-end styles for
            any occasion, without the heavy price tag.
          </p>

          {/* Highlight Features */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Why LuxueLease?</h2>
            {/* Add bullet points here */}
            <ul className="list-disc pl-6">
              <li>Discover a curated collection of fashion gems.</li>
              <li>Rent instead of buying, making luxury accessible.</li>
              <li>Enjoy secure transactions with our payment gateway.</li>
              <li>
                Subscribe for regular wardrobe updates and exclusive perks.
              </li>
            </ul>
          </div>

          {/* Call-to-Action */}
          <div className="mb-6">
            <p className="text-gray-600">
              Ready to redefine your fashion journey?{" "}
              <a href="/sign-up" className="text-blue-500 hover:underline">
                Sign Up Now
              </a>{" "}
              for the ultimate blend of style and convenience.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <p className="text-gray-600">
              Questions? Contact us at support@email.com or phone number.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
