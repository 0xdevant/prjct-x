import React from "react";
import MintWidget from "../MintSection/MintWidget";

function IntroText() {
  return (
    <div className="hidden md:flex flex-col space-y-8 flex-none bg-black w-[40%]">
      <div className="md:p-12 lg:p-16 flex flex-col justify-center space-y-6 border-y my-4 md:my-0 text-xl">
        <p className="leading-loose">
          <span className="special-font">Introducing</span>
          <br />
          <img src="/assets/soul_prjctX_desktop.png" alt="SOUL PRJCTX" />
        </p>
        <p>
          The Metaverse’s dopest and the first official branded headphone will
          be jamming with the emergence of the{" "}
          <b>SOUL&#174; PRJCT-X NFT headphones</b>.
        </p>
      </div>
      <div className="hidden md:block text-center">
        <p>
          Keep an eye on our official communication channels for sneak peeks,
          announcements, giveaways, whitelist opportunities and more.
        </p>
      </div>
      <MintWidget />
    </div>
  );
}

export default IntroText;
