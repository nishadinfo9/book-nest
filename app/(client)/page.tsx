'use client'

import BookList from "@/components/global-components/BookList";
import HeroBanner from "@/components/global-components/HeroBanner";
import HeroSlide from "@/components/global-components/HeroSlide";
import PopularAuthorPublisher from "@/components/global-components/PopularAuthorsPublisher";
import PopularAuthors from "@/components/global-components/PopularAuthorsPublisher";
import { getHomePageData } from "@/http/api";
import { useQuery } from "@tanstack/react-query";

const Home = () => {

  const { data, isLoading } = useQuery({
    queryKey: ['home'],
    queryFn: getHomePageData,
    staleTime: 60,

  })

  return (
    <div>
      <HeroBanner />
      <HeroSlide />
      <PopularAuthors
        title="Popular Authors"
        authors={data?.pupularAuthor}
        loading={isLoading}
      />

      <BookList
        title="Best Sellers"
        books={data?.bestSeller}
        loading={isLoading}
      />
      <BookList
        title="New Arrival"
        books={data?.newArrival}
        loading={isLoading}
      />

      <BookList
        title="Historical Books"
        books={data?.historyBooks}
        loading={isLoading}
      />

      <BookList
        title="English Books"
        books={data?.englishBooks}
        loading={isLoading}
      />

      <BookList
        title="Non-Fiction Books"
        books={data?.englishBooks}
        loading={isLoading}
      />

      <BookList
        title="Fiction Books"
        books={data?.englishBooks}
        loading={isLoading}
      />

      <PopularAuthorPublisher
        title="Popular Publisher"
        authors={data?.popularPublishers}
        loading={isLoading}
      />
    </div>
  );
};

export default Home;


// academicBooks
// bestSeller
// englishBooks
// fictionBooks
// historyBooks
// newArrival
// nonFictionBooks
// popularPublishers
// pupularAuthor
// sciFiBooks
// selfImprovement
