import React from "react";

function ScrollDown() {
  function scrollToVideoSection() {
    document
      .querySelector(".video-section")
      .scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="mt-4 flex flex-col space-y-4 items-center">
      <img
        src="assets/scroll_down.png"
        alt="Scroll down"
        className="w-8 cursor-pointer"
        onClick={scrollToVideoSection}
      />
      <p className="text-sm">SCROLL DOWN TO WATCH TEASER</p>
    </div>
  );
}

export default ScrollDown;
