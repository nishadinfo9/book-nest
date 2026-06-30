const authors = [
  {
    name: "Dostoyevsky",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },

  {
    name: "Stephen King",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },

  {
    name: "J.K Rowling",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },

  {
    name: "Neil Gaiman",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];

export default function PopularAuthors() {
  return (
    <section className="px-10 mt-8">
      <h2
        className="
text-2xl
font-semibold
mb-5
"
      >
        Popular Authors
      </h2>

      <div
        className="
grid
grid-cols-4
gap-5
"
      >
        {authors.map((author) => (
          <div
            key={author.name}
            className="
bg-white
rounded-xl
shadow-sm
border
p-4
flex
items-center
gap-4
"
          >
            <img
              src={author.image}
              className="
w-14
h-14
rounded-full
object-cover
"
            />

            <div>
              <h3
                className="
font-semibold
text-sm
"
              >
                {author.name}
              </h3>

              <button
                className="
text-pink-500
text-xs
mt-2
"
              >
                View More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
