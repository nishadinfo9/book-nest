"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const banners = [
  {
    title: "Best Place To Find Your Favorite Books",
    description:
      "Explore our latest releases and must-read books: your next favorite story awaits!",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
  },

  {
    title: "Discover Your Next Favorite Story",
    description: "Thousands of books from popular authors waiting for you.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  },

  {
    title: "Build Your Dream Library",
    description: "Collect, save and enjoy your favorite books anytime.",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
  },
];

export default function HeroBanner() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
      }),
    ],
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="px-10 mt-8">
      <div
        className="relative overflow-hidden rounded-2xl bg-[#5bb4d4]
"
      >
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {banners.map((banner, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] min-w-0
"
              >
                <div
                  className="h-80 flex items-center
"
                >
                  <div
                    className="w-1/2 px-16 text-white
"
                  >
                    <h1
                      className=" text-4xl font-bold leading-tight
"
                    >
                      {banner.title}
                    </h1>

                    <p
                      className=" mt-4 text-sm max-w-md
"
                    >
                      {banner.description}
                    </p>

                    <button
                      className=" mt-8 bg-pink-500 px-5 py-2 rounded-md text-sm
"
                    >
                      <Link href='/shop'>
                      See All Books →
                      </Link>
                    </button>
                  </div>

                  <div
                    className=" w-1/2 h-full flex justify-center
"
                  >
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className=" h-full object-cover
"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Previous */}

        <button
          onClick={scrollPrev}
          className=" absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2
"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Next */}

        <button
          onClick={scrollNext}
          className=" absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2
"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
  );
}
