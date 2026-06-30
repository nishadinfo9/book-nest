import Link from "next/link";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";

import Logo from "./logo";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-20">
      <div
        className="
        max-w-7xl 
        mx-auto 
        px-6 
        py-14
        grid
        grid-cols-1
        md:grid-cols-4
        gap-10
      "
      >
        {/* Brand */}
        <div className="space-y-4">
          <Link
            href="/"
            className="
              text-2xl
              font-bold
              flex
              items-center
              gap-2
            "
          >
            <Logo />
            BookNest
          </Link>

          <p
            className="
            text-sm
            text-gray-600
            leading-6
            max-w-xs
          "
          >
            Discover your next favorite book. Explore thousands of books and
            e-books in one place.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3
            className="
            font-semibold
            mb-4
          "
          >
            Explore
          </h3>

          <ul
            className="
            space-y-3
            text-sm
            text-gray-600
          "
          >
            <li>
              <Link href="/" className="hover:text-black">
                Home
              </Link>
            </li>

            <li>
              <Link href="/" className="hover:text-black">
                Books
              </Link>
            </li>

            <li>
              <Link href="/" className="hover:text-black">
                E-books
              </Link>
            </li>

            <li>
              <Link href="/" className="hover:text-black">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-4">Support</h3>

          <ul
            className="
            space-y-3
            text-sm
            text-gray-600
          "
          >
            <li>
              <Link href="/" className="hover:text-black">
                Contact
              </Link>
            </li>

            <li>
              <Link href="/" className="hover:text-black">
                FAQ
              </Link>
            </li>

            <li>
              <Link href="/" className="hover:text-black">
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link href="/" className="hover:text-black">
                Terms
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-4">Follow Us</h3>

          <div
            className="
            flex
            gap-3
          "
          >
            <Link
              href="#"
              className="
                h-9
                w-9
                border
                rounded-full
                flex
                items-center
                justify-center
                hover:text-black
                text-gray-600
              "
            >
              <FaFacebookF size={17} />
            </Link>

            <Link
              href="#"
              className="
                h-9
                w-9
                border
                rounded-full
                flex
                items-center
                justify-center
                text-gray-600
              "
            >
              <FaInstagram size={17} />
            </Link>

            <Link
              href="#"
              className="
                h-9
                w-9
                border
                rounded-full
                flex
                items-center
                justify-center
                text-gray-600
              "
            >
              <FaTwitter size={17} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div
        className="
        border-t
        border-gray-200
        py-6
        text-center
        text-sm
        text-gray-500
      "
      >
        © {new Date().getFullYear()} BookNest. All rights reserved.
      </div>
    </footer>
  );
}
