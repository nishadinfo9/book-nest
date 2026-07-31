"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Star, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />

      <div className="absolute left-0 top-0 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute right-0 bottom-0 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .6 }}
          >
            <Badge className="rounded-full px-4 py-1">
              📚 Trusted by thousands of readers
            </Badge>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight lg:text-7xl">
              Discover Your
              <span className="block text-primary">
                Next Favorite Book
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Explore thousands of books from bestselling authors,
              discover hidden gems, and build your perfect library.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/shop">
                  Browse Books
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild
              >
                <Link href="/best-sellers">
                  Best Sellers
                </Link>
              </Button>
            </div>

            {/* Stats */}

            <div className="mt-12 grid grid-cols-3 gap-6">
              <div>
                <BookOpen className="mb-2 text-primary" />
                <h3 className="text-3xl font-bold">50K+</h3>
                <p className="text-sm text-muted-foreground">
                  Books
                </p>
              </div>

              <div>
                <Users className="mb-2 text-primary" />
                <h3 className="text-3xl font-bold">20K+</h3>
                <p className="text-sm text-muted-foreground">
                  Readers
                </p>
              </div>

              <div>
                <Star className="mb-2 fill-yellow-400 text-yellow-400" />
                <h3 className="text-3xl font-bold">4.9</h3>
                <p className="text-sm text-muted-foreground">
                  Rating
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, scale: .9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .7 }}
            className="relative mx-auto"
          >
            <div className="absolute -left-8 top-8 rounded-xl border bg-background p-4 shadow-xl">
              <p className="text-sm font-semibold">
                🔥 Bestseller
              </p>
            </div>

            <div className="absolute -right-6 bottom-10 rounded-xl border bg-background p-4 shadow-xl">
              ⭐ 4.9 Rating
            </div>

            <div className="overflow-hidden rounded-3xl border bg-card p-6 shadow-2xl">
              <Image
                src="/atomic-habits.webp"
                alt="Atomic Habits"
                width={420}
                height={600}
                className="rounded-xl object-cover"
                priority
              />

              <div className="mt-6">
                <Badge>{`Editor's Choice`}</Badge>

                <h2 className="mt-4 text-2xl font-bold">
                  Atomic Habits
                </h2>

                <p className="text-muted-foreground">
                  James Clear
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">
                    4.9
                  </span>

                  <span className="text-muted-foreground">
                    (2,300 Reviews)
                  </span>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold">
                      $19.99
                    </p>

                    <p className="text-sm text-muted-foreground line-through">
                      $24.99
                    </p>
                  </div>

                  <Button>
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}