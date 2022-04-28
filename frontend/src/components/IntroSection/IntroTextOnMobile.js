import React from "react";

function IntroTextOnMobile() {
  return (
    <div className="block md:hidden flex-col space-y-8">
      <div className="p-12 flex flex-col justify-center space-y-6 border-y my-4 md:my-0">
        <p className="leading-loose">
          <span className="special-font">Introducing</span>
          <br />
          <img src="/assets/soul_prjctX_mobile.png" alt="SOUL PRJCTX" />
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
    </div>
  );
}

export default IntroTextOnMobile;
