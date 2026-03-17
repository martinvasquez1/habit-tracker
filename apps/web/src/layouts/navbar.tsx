import { Link } from "react-router";
import { useState } from "react";

import { Logo } from "@/components/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import IconWrapper from "@/components/icon-wrapper";

import { LuMenu } from "react-icons/lu";
import { LuX } from "react-icons/lu";

const links = [
  { name: "Home", path: "/" },
  { name: "Sign in", path: "/sign-in" },
  { name: "Sign up", path: "/sign-up" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-card h-18 flex items-center border">
      <div className="max-w-(--breakpoint-xl) flex flex-wrap items-center justify-between mx-auto p-4 w-full">
        <span className="flex items-center space-x-3 rtl:space-x-reverse">
          <Logo />
        </span>
        <Button
          variant="outline"
          size="icon"
          type="button"
          className="md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="sr-only">Open main menu</span>
          <IconWrapper icon={<LuMenu />} size="lg" />
        </Button>
        <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div className="hidden w-full md:block md:w-auto">
          <ul className="font-medium flex items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {links.map((link, index) => {
              if (link.path === "/sign-up") {
                return (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className={cn(
                        buttonVariants({ variant: "default" }),
                        "font-bold"
                      )}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={index}>
                  <Link
                    to={link.path}
                    className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-gray-900`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function MobileMenu({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}) {
  return (
    <>
      <button
        className={`fixed inset-0  z-10000 bg-black bg-opacity-50 transition-opacity duration-300 
         ${isMenuOpen ? "opacity-100" : "opacity-0 hidden"} 
         md:hidden`}
        type="button"
        onClick={() => setIsMenuOpen(false)}
      ></button>
      <div
        className={`fixed inset-0 z-50 flex justify-start transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="w-64 bg-white dark:bg-gray-800 shadow-lg h-full">
          <div className="flex justify-between items-center p-4">
            <Logo />
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={() => setIsMenuOpen(false)}
            >
              <IconWrapper icon={<LuX />} size="lg" />
            </Button>
          </div>
          <ul className="flex flex-col p-4">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className={
                    "block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
