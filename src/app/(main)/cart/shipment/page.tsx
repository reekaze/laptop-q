"use client";
import Appbar from "@/components/Appbar";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSelectedCartList } from "@/hooks/selectedCartList";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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

  const Map = dynamic(() => import("@/components/shipment/Map"), {
    ssr: false,
  });

  //   if (selectedList.length === 0) {
  //     router.push("/cart");
  //   }

  return (
    <div className="flex flex-col">
      <Appbar title="Shipment" />
      <div className="flex flex-col p-4 h-[40vh]">
        <Map setPosition={setPosition} position={position} center={center} />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 px-4">
        <div className="flex-1 flex flex-col gap-2">
          <p className="text-[14px] text-neutral-700">Detail Address</p>

          <Textarea placeholder="Detail Address" />
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <p className="text-[14px] text-neutral-700">Contact Phone</p>

          <Input
            type="tel"
            pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
            maxLength={12}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default CartShipmentPage;
