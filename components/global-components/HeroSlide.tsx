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
    image: '/slide1.jpg',
  },
  {
    id: 2,
    image: '/slide2.jpg',
  },

  {
    id: 3,
    image: '/slide3.jpg',
  },
  {
    id: 4,
    image: '/slide4.jpg',
  },
  {
    id: 5,
    image: '/slide5.jpg',
  },
  {
    id: 6,
    image: '/slide6.jpg',
  },
  {
    id: 7,
    image: '/slide7.jpg',
  },
];

export default function HeroSlide() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll:1
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
              className="flex-[0_0_20%] px-2"
              >
                 <Link href={'#'}>
                <Image
                  width={600}
                  height={600}
                  src={banner.image}
                  alt='banner'
                  className=" h-96 w-full object-cover  rounded-lg"
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
