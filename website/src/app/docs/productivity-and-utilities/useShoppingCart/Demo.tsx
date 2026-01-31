'use client';

import { useShoppingCart } from "../../../../../../src";
import LayoutDemo from "@/layouts/Layout";

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function Demo() {
  const cart = useShoppingCart<Product>({
    getItemKey: (item) => item.id,
    getItemPrice: (item) => item.price,
    getItemQuantity: (item) => item.quantity,
  });

  const addDummy = () => {
    cart.addItem({ id: Date.now().toString(), name: "Product", price: 100, quantity: 1 });
  }

  return (
    <LayoutDemo
      title="Shopping Cart"
    >
      <div className="flex flex-row items-center justify-center self-center gap-4 w-full">
        <button
          className="font-reddit-sans text-sm text-white/80 hover:text-white/90 transition-colors duration-500 ease-in-out border border-white/40 px-4 py-3 rounded-md cursor-pointer bg-neutral-900 hover:bg-neutral-950"
          onClick={addDummy}
        >
          Add $100 Item
        </button>
        <button
          className="font-reddit-sans text-sm text-white/80 hover:text-white/90 transition-colors duration-500 ease-in-out border border-white/40 px-4 py-3 rounded-md cursor-pointer bg-neutral-900 hover:bg-neutral-950"
          onClick={cart.clear}
        >
          Clear Cart
        </button>
      </div>

      <div className="flex flex-col items-center w-full gap-2">
        <p className="font-reddit-sans text-white/90 text-sm">Items in cart: {cart.getItemCount()}</p>
        <p className="font-reddit-sans text-white/90 text-sm">Total Quantity: {cart.getTotalQuantity()}</p>
        <p className="font-reddit-sans text-white/90 text-sm"><b>Total Amount: ${cart.getTotal()}</b></p>
      </div>

      <div className="w-full flex flex-col items-center gap-1">
        <p className="font-reddit-sans mb-2 text-white/80 text-sm">Details</p>
        {
          cart.getDetails().map(detail => (
            <li
              className="font-reddit-sans text-sm text-white/90"
              key={detail.key}
            >
              Item {detail.key}: {detail.quantity} x ${detail.unitPrice} = <b>${detail.total}</b>
            </li>
          ))
        }
      </div>
    </LayoutDemo>
  )
}
