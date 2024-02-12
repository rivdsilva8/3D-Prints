import React from "react";
import Hero from "../componenets/Hero/Hero";
import Popular from "../componenets/Popular/Popular";
import Offers from "../componenets/Offers/Offers";
import NewCollections from "../componenets/NewCollections/NewCollections";
import NewsLetter from "../componenets/NewsLetter/NewsLetter";

export default function Shop() {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
      <NewsLetter />
    </div>
  );
}
