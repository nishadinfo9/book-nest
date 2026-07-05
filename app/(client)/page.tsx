import BookList from "@/components/global-components/BookList";
import HeroBanner from "@/components/global-components/HeroBanner";
import OfferCards from "@/components/global-components/OfferSection";
import PopularAuthors from "@/components/global-components/PopularAuthors";
import React from "react";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <OfferCards/>
      <PopularAuthors />
      <BookList/>
    </div>
  );
};

export default Home;
