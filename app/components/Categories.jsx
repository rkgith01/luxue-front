import React from "react";
import BreadCrumbs from "./BreadCrumbs";

const Categories = () => {
  const categoryData = [
    {
      id: 1,
      title: "Men",
      image:
        "https://images.unsplash.com/photo-1559582798-678dfc71ccd8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1lbiUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 2,
      title: "Women",
      image:
        "https://images.unsplash.com/photo-1524255684952-d7185b509571?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHdvbWVuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 3,
      title: "Sale",
      image:
        "https://images.unsplash.com/photo-1607083206203-821b1f96c7f7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNhbGV8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 4,
      title: "Explore More..",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGV4cGxvcmUlMjBzdG9yZSUyMHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    },
  ];

  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header className="text-left flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-300 sm:text-3xl">
              New Collection
            </h2>

            <p className="mx-auto mt-4 max-w-md text-gray-500">
              Elevate your style with our new collection. Explore high-end
              fashion items for every occasion without the hefty price tag. Your
              gateway to a seamless Rent-a-Style experience awaits.
            </p>
          </header>

          <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {categoryData.map((category, index) => (
              <li key={index}>
                <a
                  href={`/category/${category.id}`}
                  className="group relative block"
                >
                  <img
                    src={category.image}
                    alt=""
                    className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                  />

                  <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                    <h3 className="text-xl font-medium text-white">
                      {category.title}
                    </h3>

                    <span className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                      Shop Now
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Categories;
