import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className=" w-full md:flex md:items-center md:justify-between p-5">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-[Poppins]">Food</span>
          <span
            className="text-3xl cursor-pointer md:hidden block relative z-[2] "
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <span >&times;</span>
            ) : (
              <IoMenu />
            )}
          </span>
        </div>
        <ul
          className={`md:flex md:items-center z-[-1] md:z-auto md:static w-full md:w-auto md:opacity-100 opacity-0 transition-opacity ease-in duration-500 ${isMenuOpen ? "top-0 opacity-100" : "-top-[400px] "
            }`}
        >
          <li className="mx-4 my-6 md:my-0">
            <a href="#" className="text-xl hover:text-green-500 duration-500">
              Home
            </a>
          </li>
          <li className="mx-4 my-6 md:my-0">
            <a href="#" className="text-xl hover:text-green-500 duration-500">
              About
            </a>
          </li>
          <li className="mx-4 my-6 md:my-0">
            <a href="#" className="text-xl hover:text-green-500 duration-500">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
