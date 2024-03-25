"use client";
import Appbar from "@/components/Appbar";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSelectedCartList } from "@/hooks/useSelectedCartList";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Map = dynamic(() => import("@/components/shipment/Map"), {
  ssr: false,
});

type CartShip = {};

const CartShipmentPage = (CartShip: CartShip) => {
  const center = {
    lat: -6.2,
    lng: 106.816666,
  };
  const selectedList = useSelectedCartList((state) => state.selectedList);
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState(center);

  // if (selectedList.length === 0) {
  //   router.push("/cart");
  // }

  return (
    <div className="flex flex-col">
      <Appbar title="Shipment" />
      <div className="flex h-[40vh] flex-col p-4">
        <Map setPosition={setPosition} position={position} center={center} />
      </div>
      <div className="flex flex-col gap-2 px-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-[14px] text-neutral-700">Detail Address</p>

          <Textarea placeholder="Detail Address" />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <p className="text-[14px] text-neutral-700">Contact Phone</p>

          <Input
            type="tel"
            pattern="[0-9]*"
            maxLength={14}
            value={phone}
            onChange={(e) => {
              if (e.target.value === "" || /^[0-9\b]+$/.test(e.target.value)) {
                setPhone(e.target.value);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CartShipmentPage;
