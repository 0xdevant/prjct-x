import React from "react";

function HeroImage() {
  return (
    <div className="flex-1">
      <picture>
        <source
          media="(min-width: 641px)"
          srcSet="/assets/HeroImageDesktop.png"
        />
        <source media="(max-width: 640px)" srcSet="/assets/HeroImageiOS.png" />
        <img
          src="/assets/HeroImageDesktop.png"
          alt="PRJCT-X Headphone"
          className="mx-auto"
        />
      </picture>
    </div>
  );
}

export default HeroImage;
