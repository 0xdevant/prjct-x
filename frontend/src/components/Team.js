import React from "react";

function Team() {
  return (
    <div className="team-section" id="team">
      <div className="md:w-3/5 lg:w-2/5 mx-auto flex flex-col justify-center items-center space-y-10 sm:space-y-16 p-8 text-center">
        <div className="flex flex-col space-y-8 justify-center items-center w-full sm:w-4/5">
          <p className="text-3xl special-font">TEAM</p>
          <p>
            <b>PRJCT-X is an official NFT</b> project brought to you by the team
            at <b>SOUL&#174;</b> with over <b>10+ years of experience</b> in
            delivering amazing tech products.
          </p>
          <picture>
            <source
              media="(min-width: 641px)"
              srcSet="assets/soul_nft_desktop.png"
            />
            <source
              media="(max-width: 640px)"
              srcSet="assets/soul_nft_mobile.png"
            />
            <img src="assets/soul_nft_desktop.png" alt="SOUL NFT" />
          </picture>
        </div>
        <span className="w-full bg-white h-0.5 sm:h-1"></span>
        <div>
          <p className="mb-2">POWERED BY</p>
          <picture>
            <source
              media="(min-width: 641px)"
              srcSet="assets/METABRGE_LOGO_desktop.png"
            />
            <source
              media="(max-width: 640px)"
              srcSet="assets/METABRGE_LOGO_mobile.png"
            />
            <img src="assets/METABRGE_LOGO_desktop.png" alt="METABRGE" />
          </picture>
        </div>
      </div>
    </div>
  );
}

export default Team;
