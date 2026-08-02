"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Container from "../common/Container";

const banners = [
  {
    id: 1,
    image: '/banner1.jpg',
  },
  {
    id: 2,
    image: '/banner2.jpg',
  },

  {
    id: 3,
    image: '/banner3.jpg',
  }
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
  <Container>
      <section className="mt-8 ">
      <div
        className="relative overflow-hidden rounded-2xl"
      >
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="flex-[0_0_100%] min-w-0"
              >

               <Link href={'#'}>
                <Image
                  width={1000}
                  height={1000}
                  src={banner.image}
                  alt='banner'
                  className=" h-96 w-full object-cover"
                />
               </Link>
              </div>


            ))}
          </div>
        </div>

        {/* Previous */}

        <button
          onClick={scrollPrev}
          className=" absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Next */}

        <button
          onClick={scrollNext}
          className=" absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
  </Container>
  );
}
