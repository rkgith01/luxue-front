"use client";
import {
  ArrowRight,
  ArrowRightCircle,
  Loader,
  ShoppingBasket,
  TicketPercent,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, resetCart } from "../store/cartReducer";
import { loadStripe } from "@stripe/stripe-js";
import { paymentRequest } from "../_utils/allApi";
import Link from "next/link";

// paymentRequest

const CartPage = () => {
  const products = useSelector((state) => state.cart.products);
  // const cartItems = useSelector((state) => state.cart)
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const totalCost = () => {
    let total = 0;
    products.forEach((item) => (total += item.quantity * item.price));
    return total;
  };

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  //   console.log(stripePromise)
  const handlePayment = async () => {
    try {
      setLoading(true);
      const stripe = await stripePromise;
      // console.log("stripe in page:", stripe)
      const response = await paymentRequest("/orders", {
        products,
      });
      console.log(response);
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.stripeSession.id,
      });

      if (error) {
        console.error("Error redirecting to checkout:", error);
      } else {
        // Dispatch resetCart only if there is no error (payment success)
        dispatch(resetCart());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 h-[100%]">
          {products.length > 0 ? (
            <div className="mx-auto max-w-3xl">
              <header className="text-center">
                <h1 className="text-xl font-bold text-gray-400 sm:text-3xl">
                  Your Cart
                </h1>
              </header>

              <div className="mt-8">
                <ul className="space-y-4">
                  {products.map((item) => (
                    <li className="flex items-center gap-4" key={item.id}>
                      <img
                        src={item.img}
                        alt=""
                        className="h-[150px] w-[120px] rounded object-cover"
                      />

                      <div>
                        <h3 className="text-md text-gray-400">{item.title}</h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-500">
                          <div>
                            <dt className="inline text-sm mr-1">Desc:</dt>
                            <dd className="inline text-wrap text-sm line-clamp-3">
                              {item.desc.substring(0, 35)}...
                            </dd>
                          </div>

                          <div>
                            <dt className="inline">Color:</dt>
                            <dd className="inline">White</dd>
                          </div>
                        </dl>
                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-500">
                          <div>
                            <dt className="inline text-lg text-blue-400  mr-1">
                              {item.quantity} :
                            </dt>
                            <dd className="inline text-lg text-blue-400">
                              ${item.price}
                            </dd>
                          </div>

                          {/* <div>
                                    <dt className="inline">Color:</dt>
                                    <dd className="inline">White</dd>
                                    </div> */}
                        </dl>
                      </div>

                      <div className="flex flex-1 items-center justify-end gap-2">
                        <form>
                          <label htmlFor="Line3Qty" className="sr-only">
                            {" "}
                            Quantity{" "}
                          </label>

                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            id="Line3Qty"
                            readOnly
                            // onChange={(e) => dispatch({ type: 'UPDATE', payload: { id: item.id, quantity: e.target.value } })}
                            className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-500 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                          />
                        </form>

                        <button
                          className="text-gray-400 transition hover:text-red-600"
                          onClick={() => dispatch(removeItem(item.id))}
                        >
                          <span className="sr-only">Remove item</span>
                          <Trash2 size={24} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                  <div className="w-screen max-w-lg space-y-4">
                    <dl className="space-y-0.5 text-sm text-gray-400">
                      <div className="flex justify-between">
                        <dt>Subtotal</dt>
                        <dd>${totalCost()}</dd>
                      </div>

                      <div className="flex justify-between">
                        <dt>VAT</dt>
                        <dd>$25</dd>
                      </div>

                      <div className="flex justify-between">
                        <dt>Discount</dt>
                        <dd>-$20</dd>
                      </div>

                      <div className="flex justify-between !text-base font-medium">
                        <dt>Total</dt>
                        <dd>${totalCost() + 25}</dd>
                      </div>
                    </dl>

                    <div className="flex justify-end">
                      <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                        <TicketPercent size={22} />
                        <p className="whitespace-nowrap text-xs">
                          2 Discounts Applied
                        </p>
                      </span>
                    </div>

                    <div className="flex  justify-end">
                      <button
                        disabled={loading}
                        // href="#"
                        className="flex gap-1 items-center justify-center rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600 cursor-pointer"
                        onClick={handlePayment}
                      >
                        Checkout{" "}
                        {loading ? (
                          <Loader
                            className="animate-spin text-white"
                            size={22}
                          />
                        ) : (
                          <ArrowRightCircle
                            className="animate-pulse text-white"
                            size={22}
                          />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl h-screen flex items-center justify-center">
              <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-mono mb-3 text-center italic text-wrap line-clamp-2">
                  No products left, Your cart is empty..!
                </h1>

                <ShoppingBasket
                  size={145}
                  className="mx-auto animate-bounce mt-2"
                />

                <Link
                  href="/"
                  className="rounded flex  justify-center bg-slate-500 px-4 py-2 text-white text-center mt-4"
                >
                  Continue Shopping{" "}
                  <ArrowRight size={24} className="animate-pulse" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CartPage;
