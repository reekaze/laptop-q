"use client";
import Appbar from "@/components/Appbar";
import LoadSpin from "@/components/LoadSpin";
import NotFound from "@/components/NotFound";
import SomethingWrong from "@/components/SomethingWrong";
import CartItems from "@/components/cart/CartItems";
import ShoppingSummary from "@/components/cart/ShoppingSummary";
import { useAllCartItems } from "@/hooks/useAllCartItems";

type CartPageProps = {};

const CartPage = ({}: CartPageProps) => {
  const { cartItems, refetch, status } = useAllCartItems();

  return (
    <div className="flex flex-col">
      <Appbar title="Cart" />
      <div className="flex flex-col md:flex-row px-4 gap-4">
        {status === "pending" ? (
          <LoadSpin hscreen={false} />
        ) : status === "error" ? (
          <SomethingWrong hscreen={false} />
        ) : cartItems.length === 0 || cartItems === null ? (
          <NotFound hscreen={false} title="Items" />
        ) : (
          <>
            <CartItems cartItems={cartItems} />
            <ShoppingSummary />
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
