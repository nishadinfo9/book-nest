import BookList from "@/components/global-components/BookList";
import HeroBanner from "@/components/global-components/HeroBanner";
import HeroSlide from "@/components/global-components/HeroSlide";
import OfferCards from "@/components/global-components/OfferSection";
import PopularAuthors from "@/components/global-components/PopularAuthors";
import React from "react";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <HeroSlide/>
      <PopularAuthors />
      <BookList/>
      {/* popular publisher */}
      {/* self-improvement book */}
      {/* English books */}
      {/* Academic books */}
      {/* History books */}
      {/* Sci-Fi books */}
      {/* Fiction books */}
      {/* Non-Fiction books */}
    </div>
  );
};

export default Home;
