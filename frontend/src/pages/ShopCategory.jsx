import React, { useContext } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../context/ShopContext";
import Banner from "../componenets/Banner/Banner";
import dropdown_icon from "../componenets/assets/dropdown_icon.png";
import Item from "../componenets/item/Item";
export default function ShopCategory(props) {
  const { all_product } = useContext(ShopContext);
  console.log("all_products =" + all_product);
  return (
    <div className="shop-category">
      <Banner name={"Shop By Category"} />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
}
