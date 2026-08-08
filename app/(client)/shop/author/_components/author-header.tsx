"use client";

import Image from "next/image";
import { BookOpen,  Globe } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";

interface Author {
  id: string;
  name: string;
  image?: string | null;
  bio?: string | null;
  profession?: string | null;

  facebook?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  instagram?: string | null;
  website?: string | null;
}

interface AuthorHeaderProps {
  author: Author;
}

export function AuthorHeader({ author }: AuthorHeaderProps) {
  return (
    <section className="overflow-hidden rounded-3xl border bg-card shadow-sm">
      <div className="grid lg:grid-cols-[320px_1fr]">

        {/* Author Image */}
        <div className="relative aspect-square bg-muted">
          <Image
            src={author?.image || "/images/author-placeholder.png"}
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between p-8 lg:p-10">

          {/* Top */}
          <div className="flex items-start justify-between gap-6">

            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                {author.name}
              </h1>

              {author.profession && (
                <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-primary">
                  {author.profession}
                </p>
              )}
            </div>

            <div className="flex gap-2">

              {author.facebook && (
                <a
                  href={author.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border p-2 transition hover:bg-primary hover:text-white"
                >
                  <FaFacebookF className="h-4 w-4" />
                </a>
              )}

              {author.twitter && (
                <a
                  href={author.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border p-2 transition hover:bg-primary hover:text-white"
                >
                  <FaTwitter className="h-4 w-4" />
                </a>
              )}

              {author.linkedin && (
                <a
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border p-2 transition hover:bg-primary hover:text-white"
                >
                  <FaLinkedinIn className="h-4 w-4" />
                </a>
              )}

              {author.instagram && (
                <a
                  href={author.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border p-2 transition hover:bg-primary hover:text-white"
                >
                  <FaInstagram className="h-4 w-4" />
                </a>
              )}

              {author.website && (
                <a
                  href={author.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border p-2 transition hover:bg-primary hover:text-white"
                >
                  <Globe className="h-4 w-4" />
                </a>
              )}

            </div>
          </div>

          {/* Bio */}
          <div className="">
            <p className="text-muted-foreground leading-8">
              {author.bio ||
                "No bio has been added for this author yet."}
            </p>
          </div>

          {/* Bottom */}
          <div className="mt-10 flex flex-wrap gap-8 border-t pt-6">

            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <BookOpen className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xl font-bold">
                  10+
                </p>
                <p className="text-sm text-muted-foreground">
                  Published Books
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}