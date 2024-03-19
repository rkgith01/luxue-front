"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* Basic Meta Tags */}
          <title>LuxeLease - Elevate Your Style, Effortlessly</title>
          <meta
            name="description"
            content="Redefine fashion with LuxeLease - Your gateway to high-end styles for any occasion, without the heavy price tag."
          />

          {/* Viewport Meta Tag */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          {/* Favicon */}
          <link rel="icon" href="/logo.jpeg" />

          {/* Open Graph Meta Tags */}
          <meta
            property="og:title"
            content="LuxeLease - Elevate Your Style, Effortlessly"
          />
          <meta
            property="og:description"
            content="Redefine fashion with LuxeLease - Your gateway to high-end styles for any occasion, without the heavy price tag."
          />
          <meta property="og:image" content="/logo.jpg" />
          <meta property="og:url" content="https://yourwebsite.com" />
          <meta property="og:type" content="website" />

          {/* Twitter Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="LuxeLease - Elevate Your Style, Effortlessly"
          />
          <meta
            name="twitter:description"
            content="Redefine fashion with LuxeLease - Your gateway to high-end styles for any occasion, without the heavy price tag."
          />
          <meta name="twitter:image" content="/logo.jpeg" />
        </head>
        <body className={inter.className}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <NavBar />
              {children}
              <Footer />
            </PersistGate>
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
