import React, { useState } from "react";

function Header() {
  const [navBarActive, setNavBarActive] = useState(false);

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      setNavBarActive(false);

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  function handleNavBar() {
    setNavBarActive(!navBarActive);
  }

  return (
    <div className="relative">
      <div className="header py-4 w-11/12 mx-auto flex items-center relative">
        <picture className="flex w-full md:w-1/2 justify-center items-center">
          <source
            media="(min-width: 641px)"
            srcSet="/assets/PRJCT_X_logo_desktop.png"
          />
          <source
            media="(max-width: 640px)"
            srcSet="/assets/PRJCT_X_logo_mobile.png"
          />
          <img
            src="/assets/PRJCT_X_logo_desktop.png"
            alt="PRJCT Logo"
            className="p-2"
          />
        </picture>
        <div className="hidden md:flex flex-grow justify-center items-center text-center space-x-16 uppercase tracking-wider">
          <a href="#about">About</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#team">Team</a>
          <a href="#follow-us">Follow us</a>
        </div>
        <button
          className="block md:hidden absolute right-0 cursor-pointer"
          onClick={handleNavBar}
        >
          <span
            className={`${
              navBarActive ? "active" : ""
            } mobile-navbar-toggle-icon`}
          ></span>
        </button>
      </div>
      <div
        className={`mobile-navbar ${
          navBarActive ? "flex" : "hidden"
        } flex-col p-8 w-full mx-auto text-center nav-items bg-black absolute top-[80px] min-h-screen uppercase tracking-widest text-lg`}
      >
        <a href="#about">About</a>
        <a href="#roadmap">Roadmap</a>
        <a href="#team">Team</a>
        <a href="#follow-us">Follow us</a>
      </div>
    </div>
  );
}

export default Header;
