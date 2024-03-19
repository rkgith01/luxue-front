"use client";
import { useState } from "react";
import {
  ArrowRightCircle,
  Loader,
  Minus,
  PlusIcon,
  RotateCcwIcon,
  ShirtIcon,
  ShoppingBasket,
  Smile,
  Trash2Icon,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, resetCart } from "../store/cartReducer";
import { loadStripe } from "@stripe/stripe-js";
import { paymentRequest } from "../_utils/allApi";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(true); // Initially open
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // const handleQuantityChange = (newQuantity) => {
  //   setQuantity(newQuantity);
  // };

  const handleCloseCart = () => {
    setIsOpen(false);
  };

  // Stripe payment directly from the cart
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

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

  const totalCost = () => {
    let total = 0;
    products.forEach((item) => (total += item.quantity * item.price));
    return total;
  };

  return (
    <div
      // className={`overflow-auto absolute top-15 right-1 z-50 w-screen max-w-sm border border-gray-600 bg-gray-300 px-4 py-8 sm:px-6 lg:px-8 h-[400px] rounded-3xl ${isOpen ? 'block' : 'hidden'}`}
      className={`h-[400px] w-[350px] mx-4 sm:mx-8 md:mx-12 lg:mx-16 z-10 rounded-md border shadow bg-slate-200 absolute right-4 sm:right-8 md:right-12 2xl:right-[15rem] top-[7rem] p-5 overflow-auto ${
        isOpen ? "block" : "hidden"
      }`}
      aria-modal="true"
      role="dialog"
      tabIndex="-1"
    >
      <button
        className="absolute end-4 top-4 text-gray-600 transition hover:scale-110"
        onClick={handleCloseCart}
      >
        <span className="sr-only">Close cart</span>
        <X size={24} />
      </button>

      {products && products.length > 0 ? (
        <div className="mt-4 space-y-6">
          <ul className="space-y-4">
            {products.map((item) => (
              <li key={item.id} className="flex items-center gap-4">
                {/* {console.log("item:", item)} */}
                <img
                  src={item.img}
                  alt=""
                  className="h-20 w-25 rounded object-cover"
                />
                <div>
                  <h3 className="text-sm text-gray-900">{item.title}</h3>
                  <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                    <div>
                      <dt className="inline">Desc:</dt>
                      <dd className="inline">
                        {item.desc?.substring(0, 45)}...
                      </dd>
                    </div>
                  </dl>

                  <dl className="mt-0.5 flex items-center  gap-2 space-y-px text-[10px] text-gray-600">
                    <dt className="inline text-[0.8rem]">{item.quantity}</dt>X
                    <dd className="inline  text-[0.8rem]">
                      ${item.quantity * item.price}
                    </dd>
                  </dl>
                  {/* to update */}
                  {/* <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                  
                  <div>
                    <dt className="inline">Size:</dt>
                    <dd className="inline">XXS</dd>
                  </div>
                  <div>
                    <dt className="inline">Color:</dt>
                    <dd className="inline">White</dd>
                  </div>
                </dl> */}
                </div>
                <div className="flex flex-1 items-center justify-end gap-2">
                  <span className="text-gray-600 text-xl p-3 rounded bg-slate-300">
                    {item.quantity}
                  </span>

                  <button
                    className="text-gray-600 px-2 transition hover:text-red-600"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    <Trash2Icon size={20} />
                    <span className="sr-only">Remove item</span>
                  </button>

                  {/* <button className="text-gray-600 transition hover:text-red-600" onClick={() => handleQuantityChange(item.quantity - 1)}>
                  <span className="sr-only">Decrease quantity</span>
                  <Minus size={18} />
                </button>
                <button className="text-gray-600 transition hover:text-red-600" onClick={() => handleQuantityChange(item.quantity + 1)}>
                  <span className="sr-only">Increase quantity</span>
                  <PlusIcon size={18} />
                </button> */}
                </div>
              </li>
            ))}
          </ul>

          {/* total and subtotal  */}

          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-gray-600">Subtotal</p>
              {/* <p className='text-gray-600'>Shipping</p> */}
              <p className="text-gray-600">{}</p>
            </div>
            <div>
              {/* <p className='text-gray-900'>Free</p> */}
              <p className="text-gray-900">${totalCost().toFixed(2)}</p>
            </div>
          </div>

          <div className="space-y-4 text-center">
            <a
              href="/cart"
              className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
            >
              Go to cart ({products.length})
            </a>
            <button
              // href=""
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded w-full bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
              onClick={() => handlePayment()}
            >
              Express Checkout w/Stripe{" "}
              {loading ? (
                <Loader className="animate-spin text-white" size={22} />
              ) : (
                <ArrowRightCircle
                  className="animate-pulse text-white"
                  size={22}
                />
              )}
            </button>
            <a
              href="/"
              className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
            >
              Continue shopping
            </a>
            <a
              href="#"
              className="flex items-center gap-1  text-sm text-gray-500  transition w-[35%] h-10 hover:text-red-600 "
              onClick={() => dispatch(resetCart())}
            >
              <RotateCcwIcon size={20} />
              <span className="text-sm text-gray-500 transition hover:text-red-600 ">
                Clear cart
              </span>
            </a>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-4 space-y-6">
            <h2 className="text-2xl text-center font-bold text-gray-900">
              Your cart is empty
            </h2>
            <ShoppingBasket
              size={150}
              className="animate-pulse mx-auto text-gray-700"
            />
            <p className="text-center justify-center text-gray-700 flex">
              Please add some items{" "}
              <span className="flex items-center">
                <ShirtIcon size={20} /> <Smile />
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
