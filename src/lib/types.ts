import {
  CartItem,
  Product,
  ProductImage,
  ProductVariant,
} from "@prisma/client";

export type ProductWithImagesWithVariants = Product & {
  ProductImages: ProductImage[];
  ProductVariants: ProductVariant[];
};

export type CartItemType = CartItem & {
  ProductVariant: ProductVariant & {
    Product: Product & {
      ProductImages: ProductImage[];
    };
  };
};
