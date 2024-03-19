"use client";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaDribbble,
} from "react-icons/fa";

const Footer = () => {
  const renderSocialLinks = () => (
    <div className="mt-6 flex justify-center gap-4 lg:justify-start">
      <SocialLink href="" icon={<FaFacebook size={24} />} />
      <SocialLink href="" icon={<FaInstagram size={24} />} />
      <SocialLink href="" icon={<FaTwitter size={24} />} />
      <SocialLink href="" icon={<FaGithub size={24} />} />
      <SocialLink href="" icon={<FaDribbble size={24} />} />
    </div>
  );

  const renderLinks = (title, links) => (
    <div>
      <strong className="font-medium text-gray-900 dark:text-white">
        {title}
      </strong>
      <ul className="mt-6 space-y-1">
        {links.map((link, index) => (
          <li key={index}>
            <a
              className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
              href="/"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  const SocialLink = ({ href, icon }) => (
    <a
      className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <span className="sr-only">Social Icon</span>
      {icon}
    </a>
  );

  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <strong className="block text-center text-xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Want us to email you with the latest blockbuster news?
          </strong>
          <form className="mt-6">
            <div className="relative max-w-lg">
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                className="w-full rounded-full border-gray-200 bg-gray-100 p-4 pe-32 text-sm font-medium dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                id="email"
                type="email"
                placeholder="john@smith.com"
              />
              <button className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </form>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-32">
          <div className="mx-auto max-w-sm lg:max-w-none">
            <p className="mt-4 text-center text-gray-500 dark:text-gray-400 lg:text-left lg:text-lg">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Praesentium natus quod eveniet aut perferendis distinctio iusto
              repudiandae, provident velit earum?
            </p>
            {renderSocialLinks()}
          </div>

          <div className="grid grid-cols-1 gap-8 text-center lg:grid-cols-3 lg:text-left">
            {renderLinks("Categories", ["Women", "Men", "Shoes", "Acessories"])}
            {renderLinks("About", ["About", "Careers", "History", "Our Team"])}
            {renderLinks("Support", ["FAQs", "Contact", "Live Chat"])}
          </div>
        </div>
        <div className="lg:flex lg:items-center lg:justify-between sm:flex-col mt-16 border-t border-gray-100 pt-8 dark:border-gray-800">
          <div className="flex items-center justify-center lg:justify-start mb-4 lg:mb-0">
            <img src="/payments.png" className="md:h-[150px] md:w-[300px]" />
          </div>

          <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between w-full">
            <img src="/logo.jpeg" className="h-10 w-10" />
            <p className="text-center lg:text-left mb-4 lg:mb-0 text-xs/relaxed text-gray-500 dark:text-gray-400">
              © Luxue Lease 2022. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
