const authors = [
  {
    name: 'Dostoyevsky',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },

  {
    name: 'Stephen King',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
  },

  {
    name: 'J.K Rowling',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },

  {
    name: 'Neil Gaiman',
    image: 'https://randomuser.me/api/portraits/men/55.jpg',
  },
];

export default function PopularAuthors() {
  return (
    <section className='mt-8 max-w-7xl px-6 mx-auto'>
      <h2 className='mb-5 text-2xl font-semibold'>Popular Authors</h2>

      <div className='grid grid-cols-4 gap-5'>
        {authors.map((author) => (
          <div
            key={author.name}
            className='flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm'
          >
            <img
              src={author.image}
              className='h-14 w-14 rounded-full object-cover'
            />

            <div>
              <h3 className='text-sm font-semibold'>{author.name}</h3>

              <button className='mt-2 text-xs text-pink-500'>
                View More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
