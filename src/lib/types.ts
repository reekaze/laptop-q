import { Product, ProductImage, ProductVariant } from "@prisma/client";

export type ProductWithImagesWithVariants = Product & {
  ProductImages: ProductImage[];
  ProductVariants: ProductVariant[];
};
