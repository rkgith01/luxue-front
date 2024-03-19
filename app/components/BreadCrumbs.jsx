"use client";
import { Home } from "lucide-react";
import React from "react";

function Breadcrumbs({ path }) {
  return (
    <div>
      <nav aria-label="Breadcrumb" className="flex">
        <ol className="flex overflow-hidden rounded-lg border border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-200">
          <li className="flex items-center">
            <a
              href="/"
              className="flex h-10 items-center gap-1.5 bg-gray-100 px-4 transition hover:text-gray-900 dark:bg-gray-800 dark:hover:text-white"
            >
              <Home className="h-5 w-5" />
              <span className="text-xs font-medium"> Home </span>
            </a>
          </li>

          {path?.split("/")[1] && (
            <li className="relative flex items-center">
              <span className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180 dark:bg-gray-800"></span>

              <a
                href=""
                className="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium transition hover:text-gray-900 dark:bg-gray-900 dark:hover:text-white"
              >
                {path?.split("/")[1]}
              </a>
            </li>
          )}
          {path?.split("/")[2] && (
            <li className="relative flex items-center">
              <span className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180 dark:bg-gray-800"></span>

              <a
                href="#"
                className="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium transition hover:text-gray-900 dark:bg-gray-900 dark:hover:text-white"
              >
                {path?.split("/")[2]}
              </a>
            </li>
          )}
        </ol>
      </nav>
    </div>
  );
}

export default Breadcrumbs;
