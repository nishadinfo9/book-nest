import Image from 'next/image';

const offers = [
  {
    id: 1,
    title: 'Flat 20% OFF',
    subtitle: 'for comics books!',
    image:
      'https://www.bookowlsbd.com/cdn/shop/files/27_d673dfd1-66c2-4ed0-996e-47b822f38fa5.png',
  },
  {
    id: 2,
    title: 'Flat 25% OFF',
    subtitle: 'for science fiction books!',
    image:
      'https://www.bookowlsbd.com/cdn/shop/files/27_d673dfd1-66c2-4ed0-996e-47b822f38fa5.png',
  },
  {
    id: 3,
    title: 'Flat 15% OFF',
    subtitle: 'for novels!',
    image:
      'https://www.bookowlsbd.com/cdn/shop/files/27_d673dfd1-66c2-4ed0-996e-47b822f38fa5.png',
  },
];

export default function OfferCards() {
  return (
    <section className='py-8'>
      <div className='grid grid-cols-3 gap-6'>
        {offers.map((offer) => (
          <div
            key={offer.id}
            className='relative flex h-[120px] items-center overflow-hidden rounded-2xl bg-[#f7f5ef] px-6'
          >
            {/* text */}

            <div className='z-10'>
              <h3 className='text-sm font-semibold text-gray-700'>
                {offer.title}
              </h3>

              <p className='mt-1 text-xs text-gray-500'>{offer.subtitle}</p>

              <button className='mt-4 text-xs text-gray-600 underline'>
                View details →
              </button>
            </div>

            {/* books image */}

            <div className='absolute right-5 bottom-0 h-[90px] w-[130px]'>
              <Image
                src={offer.image}
                alt={offer.title}
                fill
                className='object-contain'
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
