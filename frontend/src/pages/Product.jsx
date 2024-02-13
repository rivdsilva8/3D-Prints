import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import BreadCrum from "../componenets/BreadCrums/BreadCrum";
import ProductDisplay from "../componenets/ProductDisplay/ProductDisplay";
import DescriptionBox from "../componenets/DescriptionBox/DescriptionBox";
import RelatedProducts from "../componenets/RelatedProducts/RelatedProducts";

export default function Product() {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === productId);
  return (
    <div>
      <BreadCrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
}
