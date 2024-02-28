"use client";
import { Button } from "../ui/button";

type ShoppingSummaryProps = {};

const ShoppingSummary = ({}: ShoppingSummaryProps) => {
  return (
    <div className="min-w-56 h-min flex flex-col gap-4 p-4 bg-green-100/80 rounded-lg shadow-md">
      <p className="font-semibold">Shopping Summary</p>
      <div className="flex flex-row justify-between">
        <p>Total</p>
        <p className="font-semibold">$ 0.00</p>
      </div>
      <Button variant={"green"}>Buy</Button>
    </div>
  );
};

export default ShoppingSummary;
