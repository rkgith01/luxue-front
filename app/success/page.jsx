import React from "react";

const successPage = () => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <div className="flex items-center justify-center">
            <img
              src="./logo.jpeg"
              alt="brandlogo"
              className="h-24 w-24 object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mt-4">
            Your order has been placed
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Thank you for shopping with Luxue-Lease
          </p>
          <p className="text-gray-600 text-center mt-2">
            if any queries please reach out to us support@email.com
          </p>

          <div className="flex gap-1">
            <a
              href="/"
              className="capitalize bg-blue-500 text-white px-4 py-2 rounded mt-8 block mx-auto"
            >
              continue shopping
            </a>
            <a
              href="/sign-up"
              className="capitalize bg-blue-500 text-white px-4 py-2 rounded mt-8 block mx-auto"
            >
              sign-up
            </a>
          </div>

          {/* other products */}
          {/* <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="flex flex-col items-center">
                        <img
                        className="h-24 w-24 object-cover rounded"
                        src="/img/earphones.jpg"
                        alt="Earphones on a book"
                        />
                        <h3 className="text-gray-700 font-medium mt-2">Product title</h3>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded mt-2">
                        Buy Now
                        </button>
                    </div>
                
                </div> */}
        </div>
      </div>
    </div>
  );
};

export default successPage;
