import Image from "next/image";

const offers = [
  {
    id: 1,
    title: "Flat 20% OFF",
    subtitle: "for comics books!",
    image: "https://www.bookowlsbd.com/cdn/shop/files/27_d673dfd1-66c2-4ed0-996e-47b822f38fa5.png",
  },
  {
    id: 2,
    title: "Flat 25% OFF",
    subtitle: "for science fiction books!",
    image: "/offers/scifi.png",
  },
  {
    id: 3,
    title: "Flat 15% OFF",
    subtitle: "for novels!",
    image: "/offers/novels.png",
  },
];

export default function OfferCards() {
  return (
    <section className="py-8">
      <div
        className="
grid
grid-cols-3
gap-6
"
      >
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="
relative
h-[120px]
rounded-2xl
bg-[#f7f5ef]
overflow-hidden
px-6
flex
items-center
"
          >
            {/* text */}

            <div
              className="
z-10
"
            >
              <h3
                className="
text-sm
font-semibold
text-gray-700
"
              >
                {offer.title}
              </h3>

              <p
                className="
text-xs
text-gray-500
mt-1
"
              >
                {offer.subtitle}
              </p>

              <button
                className="
mt-4
text-xs
text-gray-600
underline
"
              >
                View details →
              </button>
            </div>

            {/* books image */}

            <div
              className="
absolute
right-5
bottom-0
w-[130px]
h-[90px]
"
            >
              <Image
                src={offer.image}
                alt={offer.title}
                fill
                className="
object-contain
"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
