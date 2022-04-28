import React from "react";
import RoadmapBlocks from "./RoadmapSection/RoadmapBlocks";

function Roadmap() {
  return (
    <div
      className="roadmap-section p-10 sm:pb-32 flex flex-col justify-center items-center space-y-8 relative"
      id="roadmap"
    >
      <img
        className="absolute z-0 roadmap-planets"
        src="assets/roadmap_planets.png"
        alt="Planets"
      />
      <h1 className="special-font text-theme text-2xl my-6 z-10">
        ROADMAP 1.0
      </h1>
      <RoadmapBlocks
        title="DROP IT LIKE IT’S HOT"
        desc="Release of the 2022 SOUL® PRJCT-X  NFT headphones"
      />
      <RoadmapBlocks
        title="Feel it in your SOUL"
        desc="We want to you feel the power of SOUL by offering our flagship product SOUL® EMOTION PRO
        (Limited Raffle Offer: Valued at $129) "
      />
      <RoadmapBlocks
        title="Flex in the Metaverse"
        desc="Redeem the SOUL®️ PRJCT-X NFT headphones in Decentraland at the METABRGE Store followed by The Sandbox and other Metaverse platforms."
      />
      <RoadmapBlocks
        title="Music Talent Shows"
        desc="Hang out with us at seasonal music talent shows where you can be the judge/participate to earn amazing prizes."
      />
      <RoadmapBlocks title="Limited Edition Merch " desc="Well, duh!" />
      <RoadmapBlocks
        title="THE FUTURE IS LIMITLESS"
        desc="Raffles and Whitelist opportunities for future drops and giveaways related to METABRGE"
      />
      <RoadmapBlocks
        title="Collaborations"
        desc="A strong community takes effort from everyone.  We believe in the power of partnerships to achieve our long-term vision. "
      />
    </div>
  );
}

export default Roadmap;
