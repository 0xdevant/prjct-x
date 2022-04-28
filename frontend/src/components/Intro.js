import React from "react";
import Header from "./Header";
import HeroImage from "./IntroSection/HeroImage";
import IntroText from "./IntroSection/IntroText";
import IntroTextOnMobile from "./IntroSection/IntroTextOnMobile";
import ScrollDown from "./IntroSection/ScrollDown";
import SocialIcons from "./IntroSection/SocialIcons";

function Intro() {
  return (
    <div>
      <Header />
      <div className="intro-section">
        <div className="p-8 flex flex-col justify-center items-center">
          <div className="flex space-x-8 justify-center items-center">
            <SocialIcons />
            <IntroText />
            <HeroImage />
          </div>
          <IntroTextOnMobile />
          <ScrollDown />
        </div>
      </div>
    </div>
  );
}

export default Intro;
