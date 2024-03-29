"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Bird, Trash2Icon } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

type VariantsProps = {
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  multiVariants: MultiVariants[];
  setMultiVariants: Dispatch<SetStateAction<MultiVariants[]>>;
  price: number;
  setPrice: Dispatch<SetStateAction<number>>;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  activeVariants: number;
  setActiveVariants: Dispatch<SetStateAction<number>>;
};

export type MultiVariants = {
  name: string;
  price: number;
  quantity: number;
};

const Variants = ({
  type,
  setType,
  multiVariants,
  setMultiVariants,
  price,
  setPrice,
  quantity,
  setQuantity,
  activeVariants,
  setActiveVariants,
}: VariantsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <div className="font-semibold">Variants</div>
        <div className="flex flex-row gap-2">
          {["Single", "Multi"].map((item, idx) => {
            return (
              <Badge
                onClick={() => setActiveVariants(idx)}
                key={item}
                className={cn(
                  "cursor-pointer",
                  activeVariants !== idx &&
                    "hover:bg-green-100 hover:text-green-400  hover:border-green-200",
                  activeVariants === idx
                    ? "bg-green-200 hover:bg-green-200 text-green-700 border-2 border-green-500"
                    : "bg-white text-black"
                )}
              >
                {item}
              </Badge>
            );
          })}
        </div>
      </div>
      <Separator />
      {activeVariants === 0 ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between items-center">
            <p className="text-[14px] text-neutral-500">Price ($)</p>
            <Input
              type="number"
              className="w-1/2"
              step={"0.01"}
              value={price}
              onChange={(value) => {
                setPrice(parseInt(value.currentTarget.value));
              }}
            />
          </div>
          <div className="flex flex-row justify-between items-center">
            <p className="text-[14px] text-neutral-500">Quantity</p>
            <Input
              type="number"
              className="w-1/2"
              value={quantity}
              onChange={(value) => {
                setQuantity(parseInt(value.currentTarget.value));
              }}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-[14px] text-neutral-500 flex-1">
            Type (E.g. Color)
          </p>
          <div className="flex gap-4">
            <Input
              value={type}
              onChange={(value) => {
                setType(value.currentTarget.value);
              }}
            />
          </div>

          <Separator />
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px] max-w-[250px] text-center overflow-clip">
                  {type === "" ? "Type" : type}
                </TableHead>
                <TableHead className="min-w-[200px] max-w-[250px] text-center">
                  Price ($)
                </TableHead>
                <TableHead className="min-w-[200px] max-w-[250px] text-center">
                  {" "}
                  Quantity
                </TableHead>
                <TableHead className="text-center"> </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {multiVariants.map((variant, idx) => (
                <TableRow key={idx}>
                  <TableCell className="text-center">
                    <Input
                      placeholder="Name (E.g. Blue)"
                      value={variant.name}
                      onChange={(value) => {
                        setMultiVariants(
                          multiVariants.map((item, i) => {
                            if (i === idx) {
                              return {
                                ...item,
                                name: value.currentTarget.value,
                              };
                            }
                            return item;
                          })
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Input
                      placeholder="Price..."
                      value={variant.price}
                      type="number"
                      step={"0.01"}
                      min={0}
                      onChange={(value) => {
                        setMultiVariants(
                          multiVariants.map((item, i) => {
                            if (i === idx) {
                              return {
                                ...item,
                                price: parseInt(value.currentTarget.value),
                              };
                            }
                            return item;
                          })
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Input
                      placeholder="Quantity..."
                      value={variant.quantity}
                      type="number"
                      min={0}
                      onChange={(value) => {
                        setMultiVariants(
                          multiVariants.map((item, i) => {
                            if (i === idx) {
                              return {
                                ...item,
                                quantity: parseInt(value.currentTarget.value),
                              };
                            }
                            return item;
                          })
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Trash2Icon
                      className="text-destructive cursor-pointer"
                      onClick={() => {
                        setMultiVariants(
                          multiVariants.filter((_, i) => i !== idx)
                        );
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {multiVariants.length === 0 && (
            <div className="flex justify-center">
              <Bird className="text-neutral-500" />
            </div>
          )}

          <Button
            type="button"
            onClick={() => {
              setMultiVariants([
                ...multiVariants,
                {
                  name: "",
                  price: 0,
                  quantity: 0,
                },
              ]);
            }}
            variant={"green"}
          >
            Add New Variant
          </Button>
        </div>
      )}
    </div>
  );
};

export default Variants;
